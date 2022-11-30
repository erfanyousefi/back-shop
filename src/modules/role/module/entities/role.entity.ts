import { UserEntity } from "src/modules/user/module/entity/user.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "role"})
export class RoleEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    role: string;
    @OneToMany(() => UserEntity, user => user.role, {eager: true})
    users: UserEntity[]
}
