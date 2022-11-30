import { Injectable, Logger } from "@nestjs/common";
import CustomLogger from "src/utility/logger/module/custom.logger";
import { BaseEntity, FindOneOptions, QueryRunner } from "typeorm";
import { ParamResultEnum } from "../enums/param.result.enum";
import { IsEntity } from "../utility/functions";

@Injectable()
export abstract class AbstractServiceClass<Entity, CreateDTO, UpdateDTO, PaginationDTO> {
    public logger = new Logger(AbstractServiceClass.name)
    protected constructor(
        private customLog: CustomLogger,
    ) { }
    protected abstract _getOne(searchValueDto: string, options?: FindOneOptions);
    abstract _resultGetOneDto(entity: Entity);
    async getOne<Entity extends BaseEntity>(searchValueDto: string, paramResult: ParamResultEnum, options?: FindOneOptions) {
        try {
            const getOneResult = await this._getOne(searchValueDto, options)
            if (IsEntity(paramResult)) return getOneResult
            return await this._resultGetOneDto(getOneResult);
        } catch (error) {
            this.customLog.error(error.message, error.stack, error.context)
        }
    }

    protected abstract _create(createDto: CreateDTO, query?: QueryRunner)
    abstract _resultCreateDto(entity: Entity)
    async create(createDto: CreateDTO, paramResult: ParamResultEnum, query?: QueryRunner) {
        try {
            const createEntity = await this._create(createDto, query)
            if (IsEntity(paramResult)) return createEntity
            return await this._resultCreateDto(createEntity)
        } catch (error) {
            this.customLog.error(error.message, error.stack, error.context)
        }
    }

    protected abstract _delete(searchValueDto: string, query?: QueryRunner)
    abstract _resultDeleteDto(entity: Entity)
    async delete(searchValueDto: string, paramResult: ParamResultEnum, query?: QueryRunner) {
        try {
            const deleteEntity = await this._delete(searchValueDto, query)
            if (IsEntity(paramResult)) return deleteEntity
            return await this._resultDeleteDto(deleteEntity)
        } catch (error) {
            this.customLog.error(error.message, error.stack, error.context)
        }
    }

    protected abstract _update(role_Id: string, updateDto: UpdateDTO, query?: QueryRunner)
    abstract _resultUpdateDto(entity: Entity)
    async update(role_Id: string, updateDto: UpdateDTO, paramResult: ParamResultEnum, query?: QueryRunner) {
        try {
            const updateEntity = await this._update(role_Id, updateDto, query)
            if (IsEntity(paramResult)) return updateEntity
            return await this._resultUpdateDto(updateEntity)
        } catch (error) {
            this.customLog.error(error.message, error.stack, error.context)
        }
    }

    protected abstract _pagination(pageDto: PaginationDTO)
    async pagination(pageDto: PaginationDTO) {
        try {
            return await this._pagination(pageDto);
        } catch (error) {
            this.customLog.error(error.message, error.stack, error.context)
        }
    }
}