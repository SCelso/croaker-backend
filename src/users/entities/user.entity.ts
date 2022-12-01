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

    @BeforeUpdate()
    checkDateUpdate() {
        this.lastUpdated = new Date();
    }
}
