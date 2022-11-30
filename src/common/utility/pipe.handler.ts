import { ValidationPipe } from "@nestjs/common";
import { ValidationError } from "class-validator";
import ValidationException from "../exceptions/validation.exception";

export function handleGlobalPipes(): ValidationPipe {
    return new ValidationPipe({
        skipMissingProperties: true,
        exceptionFactory: (errors: ValidationError[]) => {
            const messages: object[] = errors.map(err => {
                const childContains = err?.children[0]?.children?.[0]?.constraints
                return {
                    [err.property]: err?.constraints ? Object.values(err?.constraints) : Object.values(childContains),
                }
            });
            return new ValidationException(messages);
        }
    })
}