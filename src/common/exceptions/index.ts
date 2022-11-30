import { ExceptionFilter } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { getConnectionToken } from "@nestjs/mongoose";
import { HttpExceptionsFilter } from "./http.exception";
import { MongoExceptionFilter } from "./mongo.exception";
import { TypeOrmExceptionFilter } from "./typeorm.exception";
import ValidationFilter from "./validation.filter";

export const getGlobalFilters = (httpAdapter: HttpAdapterHost): ExceptionFilter<any>[] => ([
    new HttpExceptionsFilter(httpAdapter),
    new ValidationFilter(),
    new MongoExceptionFilter(),
    new TypeOrmExceptionFilter()
])