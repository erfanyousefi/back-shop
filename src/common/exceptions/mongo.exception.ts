import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { MESSAGES } from '@nestjs/core/constants';
import { Request, Response } from 'express';
import { MongoError, MongoServerError } from 'mongodb';
import { IErrorDetail, IErrorLocation } from 'src/utility/history/interface/error.interface';
import { saveErorrInMongo } from 'src/utility/mongodb/mongo.service';
import { ErrorMessageByStatus } from '../constant/error-messages.constant';
import { COLLECTIONS } from '../enums/mongo.enum';
import { ErrorResponse, ErrorType } from '../types/public';
import { getLogLevelByStatus } from '../utility/functions';
import ValidationFilter from './validation.filter';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError & MongoServerError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const res: Response = ctx.getResponse<Response>()
    const req: Request = ctx.getRequest<Request>()
    let errorMessage: string = exception?.message ?? new InternalServerErrorException().message;
    let statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR;
    let invalidParams: ErrorType;
    if (exception.code == 11000) {
      errorMessage = "data already exists";
      statusCode = 400;
      invalidParams = [exception.keyValue]
    }
    const errorResponse: ErrorResponse & any = {
      statusCode,
      errors: {
        title: new BadRequestException().message,
        message: errorMessage,
        code: exception.code,
        invalidParams,
      },
    };
    const error: IErrorDetail = {
      message: errorMessage,
      stack: ErrorMessageByStatus?.[statusCode] ?? MESSAGES.UNKNOWN_EXCEPTION_MESSAGE,
      context: JSON.stringify({ errorResponse, exception }),
      level: getLogLevelByStatus(statusCode),
      status: statusCode
    }
    const errorLocation: IErrorLocation = {
      filename: __filename,
      class_name: ValidationFilter.name,
      method_name: this.catch.name
    }
    saveErorrInMongo(COLLECTIONS.HISTORY, { requestDetail: req, errorDetail: error, errorLocation })
    return res.status(statusCode).json(errorResponse)
  }
}