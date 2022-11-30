import { ArgumentsHost } from "@nestjs/common";
import { AbstractRepositoryClass } from "src/common/abstract/abstract.repository";
import { PaginationDataDTO } from "src/common/dtos/pagination.dto";
import LogsService from "src/utility/logger/module/logger.service";
import { DataSource, FindOneOptions, QueryRunner, Repository } from "typeorm";
import { CreateRoleDto } from "../dto/create-role.dto";
import { PaginationRoleDto } from "../dto/pagination.dto";
import { UpdateRoleDto } from "../dto/update-role.dto";
import { RoleEntity } from "../entities/role.entity";

export class RoleRepository extends AbstractRepositoryClass<RoleEntity, CreateRoleDto, UpdateRoleDto, PaginationRoleDto> {
    private roleEntity: Repository<RoleEntity>;
    constructor(
        dataSource: DataSource,
        loggerService: LogsService,
        host: ArgumentsHost,
    ){
        super(dataSource, loggerService, host)
        this.roleEntity = this.dataSource.getRepository(RoleEntity)
    }
    async _findOneEntity(searchValueDto: string, options?: FindOneOptions<RoleEntity>): Promise<RoleEntity> {
        const searchQuery = Object.assign({ where: {id: searchValueDto}}, options);
        console.log(searchQuery);
        const role = await this.roleEntity.findOne(searchQuery);
        return role;
    }
    async _createEnity(createDto: CreateRoleDto, query?: QueryRunner): Promise<RoleEntity> {
        const newRole = this.roleEntity.create(createDto);
        if(query) return await query.manager.save(newRole)
        return await this.roleEntity.save(newRole);
    }
    _updateEntity(entity: RoleEntity, updateDto: UpdateRoleDto, query?: QueryRunner): Promise<RoleEntity> {
        throw new Error("Method not implemented.");
    }
    _deleteEntity(entity: RoleEntity, query?: QueryRunner): Promise<RoleEntity> {
        throw new Error("Method not implemented.");
    }
    _paginationEntity(paginationDto: PaginationRoleDto): Promise<PaginationDataDTO<RoleEntity>> {
        throw new Error("Method not implemented.");
    }

}