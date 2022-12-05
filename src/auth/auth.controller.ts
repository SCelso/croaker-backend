import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';

import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';

import { GetUser } from './decorators/get-user.decorator';

import { LoginUserDto } from './dto';

import { ValidRoles } from './interfaces/valid-roles';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('register')
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.authService.create(createUserDto);
    }
    @Post('login')
    loginUser(@Body() loginUserDto: LoginUserDto) {
        return this.authService.login(loginUserDto);
    }

    @Get('hola')
    @Auth(ValidRoles.admin)
    privateRoute3(@GetUser() user: User) {
        return { ok: true, user };
    }
}
