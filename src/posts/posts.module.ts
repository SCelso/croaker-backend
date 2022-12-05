import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    controllers: [PostsController],
    providers: [PostsService],
    imports: [AuthModule],
})
export class PostsModule {}
