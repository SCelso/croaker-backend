import { Type } from 'class-transformer';
import {
    IsDate,
    IsEmail,
    IsOptional,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

export class CreateUserDto {
    @IsString()
    @MinLength(1)
    name: string;

    @IsString()
    @MinLength(1)
    nickname: string;
    @IsString()
    @IsEmail()
    email: string;
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message:
            'The password must have a Uppercase, lowercase letter and a number',
    })
    password: string;

    @IsString()
    @IsOptional()
    biography: string;
    @Type(() => Date)
    @IsDate()
    birthday: Date;
}
