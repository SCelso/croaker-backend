import { Post } from 'src/posts/entities/post.entity';
import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column('text')
    name: string;
    @Column('text', { unique: true })
    nickname: string;

    @Column('text', { unique: true })
    email: string;
    @Column('text', { select: false })
    password: string;
    @Column('text', { default: '' })
    biography: string;

    @Column('date')
    birthday: Date;
    @Column('text', {
        default: '../../static/defaultProfilePictures/profilepicture.png',
    })
    profilePicture: string;

    @Column('text', { array: true, default: ['user'] })
    roles: string[];
    @Column('date')
    createdOn: Date;
    @Column('date')
    lastUpdated: Date;
    @Column('bool', { default: false })
    banned: boolean;
    @Column('bool', { default: true })
    isActive: boolean;

    @OneToMany(() => Post, (post) => post.user, {
        cascade: true,
        eager: true,
    })
    posts: Post[];

    //TODO: POSTS
    @BeforeInsert()
    checkCreatedOnInsert() {
        this.createdOn = new Date();
    }

    @BeforeInsert()
    checkFieldsInsert() {
        this.lastUpdated = new Date();
        this.name = this.name.toLowerCase().trim();

        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsUpdate() {
        this.checkFieldsInsert;
    }
}
