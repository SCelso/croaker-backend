import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
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
    biography: string;
    //TODO:  profilePicture:
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

    @BeforeUpdate()
    checkDateUpdate() {
        this.lastUpdated = new Date();
    }
}
