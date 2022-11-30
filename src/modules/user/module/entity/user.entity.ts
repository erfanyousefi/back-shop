import { EntityName } from "src/common/enums/entity.enum";
import { ROLES } from "src/common/enums/role.enum";
import { SchemaEntityName } from "src/common/enums/schema.enum";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: EntityName.USER})
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column("simple-array", {default: [], array: true})
    emails: string[];
    @Column("simple-array", {default:[], array: true})
    mobiles: string[];
    @Column({default: ROLES.USER})
    role: ROLES
}
