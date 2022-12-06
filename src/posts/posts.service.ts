import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PostsService {
    private readonly logger = new Logger('PostService');
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
    ) {}

    async create(createPostDto: CreatePostDto, user: User) {
        try {
            const { ...postDetails } = createPostDto;

            const post = await this.postRepository.create({
                ...postDetails,
                user,
            });

            await this.postRepository.save(post);
            return { ...post };
        } catch (error) {
            this.exceptionHandler(error);
        }
    }

    async findOne(id: string) {
        const post: Post = await this.postRepository.findOneBy({ id: id });
        if (!post)
            throw new NotFoundException(`Post con id: ${id} no encontrado`);

        return post;
    }

    async remove(id: string, user: User) {
        const post = await this.findOne(id);
        console.log(post);
        if (post.user.id != user.id && !user.roles.includes('admin')) {
            throw new UnauthorizedException('No estás autorizado');
        }

        await this.postRepository.remove(post);
    }

    private exceptionHandler(error) {
        this.logger.error(error);
        if (error.code === '23505') {
            throw new BadRequestException({
                errorCode: '23505',
                details: error.detail,
            });
        } else {
            throw new InternalServerErrorException(
                'No se ha podido procesar la petición',
            );
        }
    }
}
