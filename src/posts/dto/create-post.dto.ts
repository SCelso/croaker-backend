import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePostDto {
    @IsString()
    @MinLength(1)
    @MaxLength(240)
    content: string;
}
