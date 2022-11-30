import { Document } from 'mongoose';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, } from 'typeorm';
import { IdType } from '../types/abstract.type';

export interface AbstractModel extends Document {
    id?: IdType;
    createdAt?: Date;
    updatedAt?: Date;
}

@Entity()
export class AbstractEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @CreateDateColumn()
    createdAt?: string;
    @UpdateDateColumn()
    updatedAt?: string;
    static get modelName(): string {
        return this.name;
    }
}
