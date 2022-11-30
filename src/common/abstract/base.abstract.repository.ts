import { BaseInterfaceRepository } from '../interface/base.repository.interface';
import { DeleteResult, FindOptionsRelations, FindOptionsWhere, Relation, Repository, UpdateResult } from 'typeorm';
import { IdType, AbstractDocument, FindOneFilter, UpdateResultType } from '../types/abstract.type';
import { AbstractEntity } from '../models/abstract.model';

export abstract class BaseAbstractRepository<T extends AbstractEntity> implements BaseInterfaceRepository<T> {
    private entity: Repository<T>;
    protected constructor(entity: Repository<T>) {
        this.entity = entity;
    }
    async findOneById(filterCondition: FindOneFilter<T>): Promise<T> {
        return await this.entity.findOne({ where: filterCondition });
    }
    async findOneByCondition(filterCondition: FindOptionsWhere<T>): Promise<T> {
        return await this.entity.findOne({ where: filterCondition });
    }
    async findManyByCondition(filterCondition: FindOptionsWhere<T>): Promise<T[]> {
        return await this.entity.find({ where: filterCondition });
    }
    async findAll(): Promise<T[]> {
        return await this.entity.find();
    }
    async findWithRelations(relations: FindOptionsRelations<T>): Promise<Relation<T>[]> {
        return await this.entity.find({ relations })
    }
    async create(data: T | any): Promise<T> {
        return await this.entity.save(data);
    }
    async update(id: IdType, updatedDoc: AbstractDocument<T>): Promise<T> {
        return await this.entity.save(updatedDoc)
    }

    async remove(id: string): Promise<DeleteResult> {
        return await this.entity.delete(id);
    }
    async removeManyByCondition(filterCondition: FindOptionsWhere<T>): Promise<DeleteResult> {
        return await this.entity.delete({...filterCondition});

    }


}