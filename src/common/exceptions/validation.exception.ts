import { BadRequestException } from '@nestjs/common';

export default class ValidationException extends BadRequestException {
  constructor(public validationErrors: object[] | string[]) {
    super();
  }
}
