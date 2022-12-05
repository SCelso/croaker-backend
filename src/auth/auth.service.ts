import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jtwService: JwtService,
    ) {}

    async create(createUserDto: CreateUserDto) {
        try {
            const { password, ...userData } = createUserDto;
            const user = this.userRepository.create({
                ...userData,
                password: bcrypt.hashSync(password, 10),
            });

            await this.userRepository.save(user);
            delete user.password;

            return { ...user, token: this.getJwtToken({ id: user.id }) };

            //TODO: retornar JWT de acceso
        } catch (error) {
            console.log(error);
            this.handleDBErrors(error);
        }
    }

    private getJwtToken(payload: JwtPayload) {
        const token = this.jtwService.sign(payload);
        return token;
    }

    async login(loginUserDto: LoginUserDto) {
        const { password, email } = loginUserDto;
        const user = await this.userRepository.findOne({
            where: { email },
            select: { email: true, password: true, id: true }, //! OJO!
        });

        if (!user || !bcrypt.compareSync(password, user.password)) {
            throw new UnauthorizedException('Credentials are not valid');
        }

        return { ...user, token: this.getJwtToken({ id: user.id }) };
    }

    private handleDBErrors(error: any): never {
        if (error.code === '23505') {
            throw new BadRequestException(error.detail);
        } else {
            throw new InternalServerErrorException('Please check server logs');
        }
    }
}
