
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    InternalServerErrorException,
  } from '@nestjs/common';
  import { HttpAdapterHost } from '@nestjs/core';
import { MESSAGES } from '@nestjs/core/constants';
import { Request } from 'express';
import { IErrorDetail, IErrorLocation } from 'src/utility/history/interface/error.interface';
import { saveErorrInMongo } from 'src/utility/mongodb/mongo.service';
import { ErrorMessageByStatus } from '../constant/error-messages.constant';
import { COLLECTIONS } from '../enums/mongo.enum';
import { getLogLevelByStatus } from '../utility/functions';
  
  @Catch()
  export class HttpExceptionsFilter implements ExceptionFilter {
    constructor(
      private readonly httpAdapterHost: HttpAdapterHost
    ) {}
    catch(exception: unknown, host: ArgumentsHost):void {
      const { httpAdapter } = this.httpAdapterHost;
      const ctx = host.switchToHttp();
      const req: Request = ctx.getRequest<Request>()
      let httpStatus: number, message: string;
      if(exception instanceof HttpException) {
        httpStatus = exception.getStatus();
        message = exception.message;
      }else {
        httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        message = new InternalServerErrorException().message;
      }
      const responseBody = {
        statusCode: httpStatus ,
        timestamp: new Date().toISOString(),
        errors: {
          path: httpAdapter.getRequestUrl(ctx.getRequest()),
          message,
          invalidParams: [],
        }
      };
      const error: IErrorDetail = {
        message,
        stack: ErrorMessageByStatus?.[httpStatus] ?? MESSAGES.UNKNOWN_EXCEPTION_MESSAGE,
        context: JSON.stringify({responseBody, exception}),
        level: getLogLevelByStatus(httpStatus),
        status: httpStatus
      }
      const errorLocation: IErrorLocation = {
        filename:  __filename,
        class_name: HttpExceptionsFilter.name,
        method_name: this.catch.name
      }
      saveErorrInMongo(COLLECTIONS.HISTORY, 
        { requestDetail: req, errorDetail: error, errorLocation }
      )
      httpAdapter.reply(ctx.getResponse(), responseBody,httpStatus);
    }
  }
  