import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { History, HistorySchema } from "src/utility/history/schema/history.schema";
import LogsService from "src/utility/logger/module/logger.service";
import { RoleRepository } from "../module/repositories/role.repository";
import { RoleModule } from "../module/role.module";
import { RoleService } from "../module/services/role.service";
import { RoleController } from "./controllers/role.controller";

@Module({
    imports: [RoleModule],
    controllers: [RoleController],
    providers: [],
    exports: []
})
export class RoleCoreModule {}