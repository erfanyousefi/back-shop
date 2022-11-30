import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import "./config/global/enviorment.config"
import { SwaggerInit } from './config/global/swagger.config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { getGlobalFilters } from './common/exceptions';
import { handleGlobalPipes } from './common/utility/pipe.handler';
import getLogLevels from './utility/logger/module/functions/getLogLevels';
import CustomLogger from './utility/logger/module/custom.logger';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,
    {
      logger: getLogLevels(),
      bufferLogs: true
    }
  );
  app.useLogger(app.get(CustomLogger))
  const httpAdapter = app.get(HttpAdapterHost)
  app.enableCors();
  app.useStaticAssets(join(process.cwd(), "public"));
  app.useGlobalFilters(...getGlobalFilters(httpAdapter));
  app.useGlobalPipes(handleGlobalPipes())
  SwaggerInit(app)
  await app.listen(process.env.PORT);
}
bootstrap();
