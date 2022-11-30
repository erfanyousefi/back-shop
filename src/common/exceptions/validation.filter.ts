import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { MESSAGES } from '@nestjs/core/constants';
import { Request, Response } from 'express';
import { ErrorResponse, ErrorType } from 'src/common/types/public';
import { IErrorDetail, IErrorLocation } from 'src/utility/history/interface/error.interface';
import { saveErorrInMongo } from 'src/utility/mongodb/mongo.service';
import { ErrorMessageByStatus } from '../constant/error-messages.constant';
import { COLLECTIONS } from '../enums/mongo.enum';
import { getLogLevelByStatus } from '../utility/functions';
import ValidationException from './validation.exception';

@Catch(ValidationException)
export default class ValidationFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res: Response = ctx.getResponse<Response>();
    const req: Request = ctx.getRequest<Request>();
    let statusCode: HttpStatus;
    let errorMessage: ErrorType;
    let invalidParams: ErrorType;
    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      errorMessage = exception.message;
      const errors = []
      exception.validationErrors.forEach(err => {
        const keys = Object.keys(err)
        errors.push({ [keys[0]]: err[keys[0]][0] })
      })
      invalidParams = errors
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      errorMessage = new InternalServerErrorException().message;
      invalidParams = {};
    }
    const errorResponse: ErrorResponse = {
      statusCode,
      errors: {
        title: errorMessage,
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
    return res.status(errorResponse.statusCode).json(errorResponse);
  }
}


