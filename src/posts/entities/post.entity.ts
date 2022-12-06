// import { User } from 'src/auth/entities/user.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    content: string;

    @ManyToOne(() => User, (user) => user.posts, { eager: true })
    user: User;
}
