// import { User } from 'src/auth/entities/user.entity';
import { Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Post {
    // @ManyToOne(() => User, (user) => user.posts, {
    //     onDelete: 'CASCADE',
    // })
    // user: User;
}
