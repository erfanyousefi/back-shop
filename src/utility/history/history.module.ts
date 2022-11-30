import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { HistoryService } from "./history.service";
import { History, HistorySchema } from "./schema/history.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: History.name, schema: HistorySchema}
        ])
    ],
    providers: [HistoryService],
    exports: [HistoryService]
})
export class HistoryModule{}