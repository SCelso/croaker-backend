import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    Logger,
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

    findAll() {
        return `This action returns all users`;
    }

    findOne(id: number) {
        return `This action returns a #${id} user`;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
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
