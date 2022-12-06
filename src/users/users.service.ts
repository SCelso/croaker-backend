import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class UsersService {
    private readonly logger = new Logger('ProductsService');
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly dataSource: DataSource,
    ) {}

    findOneUser(id: string) {
        const user = this.userRepository.findOneBy({ id });
        return user;
    }

    findAll() {
        return `This action returns all users`;
    }

    async find(term: string) {
        const queryBuilder = this.userRepository.createQueryBuilder();
        const users = await queryBuilder
            .where(`name LIKE :name or nickname LIKE :nickname`, {
                name: `%${term}%`,
                nickname: `%${term}%`,
            })
            .getMany();

        if (users.length < 1) {
            throw new NotFoundException('Usuario no encontrado');
        }

        return users;
    }

    async update(id: string, updateUserDto: UpdateUserDto, userReq: User) {
        const user = await this.userRepository.preload({
            id,
            ...updateUserDto,
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (user.id != userReq.id && !userReq.roles.includes('admin')) {
            throw new UnauthorizedException('No estás autorizado');
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await queryRunner.manager.save(user);
            await queryRunner.commitTransaction();
            await queryRunner.release();
            return this.userRepository.findOneBy({ id });
        } catch (error) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            this.handleDBExceptions(error);
        }
    }

    private handleDBExceptions(error: any) {
        if (error.code === '23505') throw new BadRequestException(error.detail);

        this.logger.error(error);
        // console.log(error)
        throw new InternalServerErrorException(
            'Unexpected error, check server logs',
        );
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
