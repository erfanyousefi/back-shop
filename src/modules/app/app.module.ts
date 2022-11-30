import "src/config/global/enviorment.config"
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getMongoURL } from 'src/config/database/mongoose.config';
import { getTypeOrmOptions } from 'src/config/database/typeorm.config';
import { AppController } from './app.controller';
import { RedisModule } from 'src/utility/redis/redis.module';
import { RedisService } from 'src/utility/redis/redis.service';
import { HistoryModule } from 'src/utility/history/history.module';
import { MongooseModule } from '@nestjs/mongoose';
import LogsMiddleware from "src/utility/logger/module/middleware/logger.middleware";
import { LoggerModule } from "src/utility/logger/logger.module";
import CustomLogger from "src/utility/logger/module/custom.logger";
@Module({
  imports: [
    TypeOrmModule.forRoot(getTypeOrmOptions()),
    MongooseModule.forRoot(getMongoURL()),
    LoggerModule,
    RedisModule,
    HistoryModule
  ],
  controllers: [AppController],
  providers: [RedisService, CustomLogger],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes({path: '*', method: RequestMethod.ALL});
  }
}
