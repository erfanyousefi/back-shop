
import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { History, HistorySchema } from '../history/schema/history.schema';
import CustomLogger from './module/custom.logger';
import LogsService from './module/logger.service';

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([
            {name: History.name, schema: HistorySchema}
        ])
    ],
    providers: [LogsService],
    exports: [LogsService ],
})
export class LoggerModule { }