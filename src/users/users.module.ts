import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ProfilePicture } from './entities/profile-picture.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, ProfilePicture])],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
