import { EntityName } from "src/common/enums/entity.enum";
import { ROLES } from "src/common/enums/role.enum";
import { SchemaEntityName } from "src/common/enums/schema.enum";
import { RoleEntity } from "src/modules/role/entities/role.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: EntityName.USER})
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column("simple-array", {default: [], array: true})
    emails: string[];
    @Column("simple-array", {default:[], array: true})
    mobiles: string[];
    @ManyToOne(() => RoleEntity, role => role.users)
    role: RoleEntity
}
