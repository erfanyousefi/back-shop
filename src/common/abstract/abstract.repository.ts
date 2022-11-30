import { ArgumentsHost, Injectable, NotFoundException } from "@nestjs/common";
import { Request } from "express";
import { IErrorLocation } from "src/utility/history/interface/error.interface";
import LogsService from "src/utility/logger/module/logger.service";
import { DataSource, FindOneOptions, QueryRunner } from "typeorm";
import { PaginationDataDTO } from "../dtos/pagination.dto";
@Injectable()
export abstract class AbstractRepositoryClass<Entity, CreateDTO, UpdateDTO, PaginationDTO> {
    
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
        this.location.class_name = AbstractRepositoryClass.name
        this.req = this.host.switchToHttp().getRequest<Request>()
     }
    abstract _findOneEntity(searchValueDto: string, options?: FindOneOptions): Promise<Entity>;
    abstract _createEnity(createDto: CreateDTO, query?: QueryRunner): Promise<Entity>;
    abstract _updateEntity(entity: Entity, updateDto: UpdateDTO, query?: QueryRunner): Promise<Entity>;
    abstract _deleteEntity(entity: Entity, query?: QueryRunner): Promise<Entity>;
    abstract _paginationEntity(paginationDto: PaginationDTO): Promise<PaginationDataDTO<Entity>>;

    async findOneEntity(searchValueDto: string, options?: FindOneOptions): Promise<Entity> {
        try {
            const entity = await this._findOneEntity(searchValueDto, options);
            if (!entity) throw new NotFoundException();
            return entity;
        } catch (error) {
            this.location.method_name = this.findOneEntity.name; 
            this.loggerService.saveErrorLog(this.req, error, this.location)
        }
    }
    async createEntity(createDto: CreateDTO, query?: QueryRunner): Promise<Entity> {
        try {
            const entity = await this._createEnity(createDto, query);
            return entity
        } catch (error) {
            this.location.method_name = this.createEntity.name; 
            this.loggerService.saveErrorLog(this.req, error, this.location)
        }
    }

    async paginationEntity(paginationDto: PaginationDTO): Promise<PaginationDataDTO<Entity>> {
        try {
            const paginatedData = await this._paginationEntity(paginationDto);
            return paginatedData;
        } catch (error) {
            this.location.method_name = this.paginationEntity.name; 
            this.loggerService.saveErrorLog(this.req, error, this.location)
        }
    }
    async updateEntity(entity: Entity, updateDto: UpdateDTO, query?: QueryRunner): Promise<Entity> {
        try {
            const updatedResult = await this._updateEntity(entity, updateDto, query);
            return updatedResult;
        } catch (error) {
            this.location.method_name = this.updateEntity.name;
            this.loggerService.saveErrorLog(this.req, error, this.location)
        }
    }
    async deleteEntity(entity: Entity, query?: QueryRunner) {
        try {
            if (query) return await query.manager.remove(entity);
            return await this.dataSource.manager.remove(entity);
        } catch (error) {
            this.location.method_name = this.deleteEntity.name;
            this.loggerService.saveErrorLog(this.req, error, this.location)
        }
    }
}