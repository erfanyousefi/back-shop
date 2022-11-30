import { DeleteResult, FindManyOptions, FindOneOptions, FindOptionsWhere, QueryRunner, UpdateResult } from 'typeorm';
import { AbstractModel } from '../models/abstract.model';
import { AbstractDocument, IdType } from '../types/abstract.type';

export interface BaseInterfaceRepository<T> {
  create(data: T | any): Promise<T>;

  findOneByCondition(filterCondition: FindOptionsWhere<T>): Promise<T>;

  findManyByCondition(filterCondition: FindOptionsWhere<T>): Promise<T[]>;

  findAll(): Promise<T[]>;

  remove(id: string): Promise<DeleteResult>;

  removeManyByCondition(filterCondition: FindOptionsWhere<T>): Promise<DeleteResult>;

  findWithRelations(relations: any): Promise<T[]>;

  update(id: IdType, updatedDoc: AbstractDocument<T>): Promise<T>;
}