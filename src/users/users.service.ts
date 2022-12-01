import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    private readonly logger = new Logger('UsersServices');
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto) {
        try {
            const user = await this.userRepository.create(createUserDto);
            await this.userRepository.save(user);
            return user;
        } catch (error) {
            this.exceptionHandler(error);
        }
    }

    async findAll() {
        const users = await this.userRepository.find();
        return users;
    }

    async findOne(term: string) {
        const queryBuilder = this.userRepository.createQueryBuilder();

        const user = await queryBuilder
            .where('name=:name or nickname=:nickname', {
                name: term,
                nickname: term,
            })
            .getMany();

        if (user.length < 1) {
            throw new NotFoundException(`Usuario no encontrado`);
        }
        return user;
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const user = await this.userRepository.preload({
            id: id,
            ...updateUserDto,
        });

        if (!user) {
            throw new NotFoundException(`No se ha encontrado el usuario`);
        }

        try {
            await this.userRepository.save(user);
            return user;
        } catch (error) {
            this.exceptionHandler(error);
        }
    }

    remove(id: string) {
        return `This action removes a #${id} user`;
    }

    private exceptionHandler(error) {
        this.logger.error(error);
        if (error.code === '23505') {
            throw new BadRequestException({
                errorCode: '23505',
                details: error.detail,
            });
        } else {
            throw new InternalServerErrorException(
                'No se ha podido procesar la petición',
            );
        }
    }
}
