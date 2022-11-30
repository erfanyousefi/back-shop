import { HttpStatus } from '@nestjs/common';

export type MulterCallback<T> = (error: any, data?: T) => any;

export type RestFulResponse = {
  statusCode: HttpStatus;
  message?: string;
};

export type FieldErrorMessage = { [key: string]: string }[];

export type CustomValidationError = {
  title: string;
  message?: string
  path? : string;
  invalidParams: FieldErrorMessage;
};

export type ErrorType = string | any;

export type ErrorResponse = RestFulResponse & {
  errors: CustomValidationError;
};

export type RolePermissionsType = {
  ADMIN: string[];
  USER: string[];
};
