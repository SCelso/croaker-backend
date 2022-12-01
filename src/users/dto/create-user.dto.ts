import { Type } from 'class-transformer';
import { IsDate, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @MinLength(1)
    name: string;

    @IsString()
    @MinLength(1)
    nickname: string;
    @IsString()
    biography: string;
    //TODO:  profilePicture:
    @Type(() => Date)
    @IsDate()
    birthday: Date;
}
