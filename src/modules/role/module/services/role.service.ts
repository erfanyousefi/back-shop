import { ArgumentsHost, Injectable } from '@nestjs/common';
import { AbstractServiceClass } from 'src/common/abstract/abstract.service';
import LogsService from 'src/utility/logger/module/logger.service';
import { DataSource, FindOneOptions, QueryRunner } from 'typeorm';
import { CreateRoleDto } from '../dto/create-role.dto';
import { PaginationRoleDto } from '../dto/pagination.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { RoleEntity } from '../entities/role.entity';
import { RoleRepository } from '../repositories/role.repository';

@Injectable()
export class RoleService extends AbstractServiceClass<RoleEntity, CreateRoleDto, UpdateRoleDto, PaginationRoleDto> {
  constructor(
    dataSource: DataSource,
    loggerService: LogsService,
    host: ArgumentsHost,
    public roleRepository: RoleRepository
){
    super(dataSource, loggerService, host)
}
  protected async _getOne(searchValueDto: string, options?: FindOneOptions<any>) {
    const role = await this.roleRepository._findOneEntity(searchValueDto, options);
    return role
  }
  _resultGetOneDto(entity: RoleEntity) {
    throw new Error('Method not implemented.');
  }
  protected async _create(createDto: CreateRoleDto, query?: QueryRunner) {
    const roleResult = await this.roleRepository._createEnity(createDto, query);
    return roleResult;
  }
  _resultCreateDto(entity: RoleEntity) {
    throw new Error('Method not implemented.');
  }
  protected _delete(searchValueDto: string, query?: QueryRunner) {
    throw new Error('Method not implemented.');
  }
  _resultDeleteDto(entity: RoleEntity) {
    throw new Error('Method not implemented.');
  }
  protected _update(role_Id: string, updateDto: UpdateRoleDto, query?: QueryRunner) {
    throw new Error('Method not implemented.');
  }
  _resultUpdateDto(entity: RoleEntity) {
    throw new Error('Method not implemented.');
  }
  protected _pagination(pageDto: PaginationRoleDto) {
    throw new Error('Method not implemented.');
  }
  
}
