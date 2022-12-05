import { Controller, Get, Post, Body } from '@nestjs/common';

import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';

import { GetUser } from './decorators/get-user.decorator';

import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

import { User } from './entities/user.entity';
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
    //@SetMetadata('roles', ['admin', 'super-user'])
    @Auth()
    privateRoute3(@GetUser() user: User) {
        return { ok: true, user };
    }
}
