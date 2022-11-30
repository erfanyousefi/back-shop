import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History, HistorySchema } from 'src/utility/history/schema/history.schema';
import { LoggerModule } from 'src/utility/logger/logger.module';
import { RoleEntity } from './entities/role.entity';
import { RoleRepository } from './repositories/role.repository';
import { RoleService } from './services/role.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleEntity]),
    MongooseModule.forFeature([{name: History.name, schema: HistorySchema}]),
  ],
  providers: [ RoleService, RoleRepository],
  exports: [RoleService]
})
export class RoleModule { }
