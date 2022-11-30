import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { EntityNotFoundError, QueryFailedError } from "typeorm";
import { ErrorResponse } from "../types/public";

@Catch(QueryFailedError, EntityNotFoundError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
    catch(exception: QueryFailedError & EntityNotFoundError, host: ArgumentsHost) {
      const context = host.switchToHttp();
      const response = context.getResponse<Response>();
      const request = context.getRequest<Request>();
      const { url } = request;
      const { name } = exception;
      
      const errorResponse: ErrorResponse = {
        statusCode: HttpStatus.BAD_REQUEST,
        errors: {
          title: new BadRequestException().message,
          message: name,
          path: url,
          invalidParams: [],
        },
      };
      response.status(HttpStatus.BAD_REQUEST).json(errorResponse);
    }
  }