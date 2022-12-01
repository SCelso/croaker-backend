import { ProfilePicture } from './profile-picture.entity';
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
    @Column('text')
    biography?: string;

    @Column('date')
    birthday: Date;
    @Column('date')
    createdOn: Date;
    @Column('date')
    lastUpdated: Date;
    @Column()
    admin: boolean;
    @Column()
    banned: boolean;
    @Column()
    isActive: boolean;

    @OneToMany(() => ProfilePicture, (profilePicture) => profilePicture.user, {
        cascade: true,
        eager: true,
    })
    profilePicture: ProfilePicture;

    //TODO: POSTS

    @BeforeInsert()
    checkCreatedOnInsert() {
        if (!this.createdOn) {
            this.createdOn = new Date();
        }
    }

    @BeforeInsert()
    checkUpdatedOnInsert() {
        if (!this.lastUpdated) {
            this.lastUpdated = new Date();
        }
    }

    @BeforeInsert()
    checkBiographyInsert() {
        if (!this.biography) {
            this.biography = '';
        }
    }

    @BeforeInsert()
    checkAdminInsert() {
        if (!this.admin) {
            this.admin = false;
        }
    }

    @BeforeInsert()
    checkBannedInsert() {
        if (!this.banned) {
            this.banned = false;
        }
    }

    @BeforeInsert()
    checkActiveInsert() {
        if (!this.isActive) {
            this.isActive = true;
        }
    }

    @BeforeInsert()
    checkProfilePictureInsert() {
        if (!this.profilePicture) {
            this.profilePicture = new ProfilePicture();
        }
    }

    @BeforeUpdate()
    checkDateUpdate() {
        this.lastUpdated = new Date();
    }
}
