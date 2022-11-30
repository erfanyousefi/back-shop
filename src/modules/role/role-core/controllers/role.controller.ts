import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateRoleDto } from '../../module/dto/create-role.dto';
import { ParamResultEnum } from 'src/common/enums/param.result.enum';
import { RoleService } from '../../module/services/role.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { SwaggerConsumes } from 'src/common/enums/swagger.enum';

@Controller('role')
@ApiTags("Role")
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ApiConsumes(SwaggerConsumes.FORM_URL_ENCODED, SwaggerConsumes.JSON)
  @ApiBody({type: CreateRoleDto})
  async create(@Body() createRoleDto: CreateRoleDto) {
    return await this.roleService.create(createRoleDto, ParamResultEnum.DTO);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.getOne(id, ParamResultEnum.Entity);
  }
  // @Get()
  // findAll() {
  //   return this.roleService.getOne();
  // }


  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
  //   return this.roleService.update(+id, updateRoleDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.roleService.remove(+id);
  // }
}
