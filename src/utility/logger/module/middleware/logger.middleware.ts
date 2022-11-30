
import {Injectable, NestMiddleware } from '@nestjs/common';
import { ErrorHttpStatusCode } from '@nestjs/common/utils/http-error-by-code.util';
import { MESSAGES } from '@nestjs/core/constants';
import { Request, Response, NextFunction } from 'express';
import { ErrorMessageByStatus } from 'src/common/constant/error-messages.constant';
import { getLogLevelByStatus } from 'src/common/utility/functions';
import { IErrorDetail, IErrorLocation } from 'src/utility/history/interface/error.interface';
import CustomLogger from '../custom.logger';
import LogsService from '../logger.service';

@Injectable()
class LogsMiddleware implements NestMiddleware {
  constructor(
    private readonly logger: CustomLogger,
    private loggerService: LogsService
  ) { }
  use(request: Request, response: Response, next: NextFunction) {
    response.on('finish', () => {
      const { method, originalUrl } = request;
      const statusCode: ErrorHttpStatusCode = response.statusCode
      const statusMessage: string = response.statusMessage;
      const message = `${method} ${originalUrl} ${statusCode} ${statusMessage}`;
      const error: IErrorDetail = {
        message,
        stack: ErrorMessageByStatus?.[statusCode] ?? MESSAGES.UNKNOWN_EXCEPTION_MESSAGE,
        status: statusCode,
        level: getLogLevelByStatus(statusCode)
      }
      const errorLocation: IErrorLocation = {
        filename: __filename,
        class_name: LogsMiddleware.name,
        method_name: this.use.name
      }
      this.loggerService.saveErrorLog(request, error, errorLocation)
      if (statusCode >= 500) {
        return this.logger.error(message);
      }
      if (statusCode >= 400) {
        return this.logger.warn(message);
      }
      return this.logger.log(message);
    });
    next();
  }
}

export default LogsMiddleware;