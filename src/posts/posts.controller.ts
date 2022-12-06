import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseUUIDPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/users/entities/user.entity';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Post()
    @Auth()
    create(
        @Body() createPostDto: CreatePostDto,
        @GetUser()
        user: User,
    ) {
        return this.postsService.create(createPostDto, user);
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.postsService.findOne(id);
    }

    @Delete(':id')
    @Auth()
    remove(
        @GetUser()
        user: User,
        @Param('id', ParseUUIDPipe) id: string,
    ) {
        return this.postsService.remove(id, user);
    }
}
