import {
    BeforeInsert,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'profile_pictures' })
export class ProfilePicture {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    url: string;

    @ManyToOne(() => User, (user) => user.profilePicture)
    user: User;

    @BeforeInsert()
    checkProfilePictureInsert() {
        if (!this.url) {
            this.url = '../../static/defaultProfilePictures/profilepicture.png';
        }
    }
}
