import {
    Controller,
    Get,
    Body,
    Patch,
    Param,
    Delete,
    ParseUUIDPipe,
    Req,
} from '@nestjs/common';
import { UsersService } from './users.service';

import { UpdateUserDto } from './dto/update-user.dto';

import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { Request } from 'express';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @Auth(ValidRoles.admin)
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':term')
    @Auth()
    find(@Param('term') term: string) {
        return this.usersService.find(term);
    }

    @Patch(':id')
    @Auth()
    update(
        @GetUser() user: User,
        @Param('id', ParseUUIDPipe)
        id: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return this.usersService.update(id, updateUserDto, user);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }
}
