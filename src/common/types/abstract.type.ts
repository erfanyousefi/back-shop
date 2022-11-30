import { DeepPartial, DeleteResult, FindManyOptions, FindOptionsWhere, UpdateResult } from "typeorm";
import { AbstractEntity, AbstractModel } from "../models/abstract.model";

export type IdType = number | string;
export type AbstractDocument<T> = 
T extends AbstractModel? T : T extends AbstractEntity ? T &  DeepPartial<T> : any;

export type FindManyFilter<T> = T extends AbstractEntity
  ? FindManyOptions<T> & FindOptionsWhere<T>
  : any;
export type FindOneFilter<T> = T extends AbstractEntity
  ? FindOptionsWhere<T>
  : any;

  export type UpdateResultType<T> = T extends AbstractModel
  ? T
  : T extends AbstractEntity
  ? UpdateResult
  : any;

export type DeleteResultType<T> = T extends AbstractModel
  ? T
  : T extends AbstractEntity
  ? DeleteResult
  : any;
