import { ArgumentsHost, Injectable, Logger } from "@nestjs/common";
import { Request } from "express";
import { IErrorLocation } from "src/utility/history/interface/error.interface";
import LogsService from "src/utility/logger/module/logger.service";
import { BaseEntity, DataSource, FindOneOptions, QueryRunner } from "typeorm";
import { ParamResultEnum } from "../enums/param.result.enum";
import { IsEntity } from "../utility/functions";

@Injectable()
export abstract class AbstractServiceClass<Entity, CreateDTO, UpdateDTO, PaginationDTO> {
    public logger = new Logger(AbstractServiceClass.name)
    private req: Request;
    private location: IErrorLocation = {
        filename: __filename,
        method_name: "",
        class_name: ""
    }
    protected constructor(
        public dataSource: DataSource,
        private loggerService: LogsService,
        private host: ArgumentsHost
    ) {
        this.location.class_name = AbstractServiceClass.name
        this.req = this.host.switchToHttp().getRequest<Request>()
    }
    protected abstract _getOne(searchValueDto: string, options?: FindOneOptions);
    abstract _resultGetOneDto(entity: Entity);
    async getOne<Entity extends BaseEntity>(searchValueDto: string, paramResult: ParamResultEnum, options?: FindOneOptions) {
        try {
            const getOneResult = await this._getOne(searchValueDto, options)
            if (IsEntity(paramResult)) return getOneResult
            return await this._resultGetOneDto(getOneResult);
        } catch (error) {
            this.location.method_name = this.getOne.name
            this.loggerService.saveErrorLog(this.req, error, this.location)
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
            this.location.method_name = this.create.name
            this.loggerService.saveErrorLog(this.req, error, this.location)
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
            this.location.method_name = this.delete.name
            this.loggerService.saveErrorLog(this.req, error, this.location)
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
            this.location.method_name = this.update.name
            this.loggerService.saveErrorLog(this.req, error, this.location)
        }
    }

    protected abstract _pagination(pageDto: PaginationDTO)
    async pagination(pageDto: PaginationDTO) {
        try {
            return await this._pagination(pageDto);
        } catch (error) {
            this.location.method_name = this.pagination.name
            this.loggerService.saveErrorLog(this.req, error, this.location)
        }
    }
}