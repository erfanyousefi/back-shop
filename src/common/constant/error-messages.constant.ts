import { BadGatewayException, BadRequestException, ConflictException, ForbiddenException, GatewayTimeoutException, HttpStatus, InternalServerErrorException, MethodNotAllowedException, NotAcceptableException, NotFoundException, NotImplementedException, PayloadTooLargeException, RequestTimeoutException, ServiceUnavailableException, UnauthorizedException } from "@nestjs/common";
import { ApiTooManyRequestsResponse } from "@nestjs/swagger";

export const ErrorMessageByStatus = {
    [HttpStatus.BAD_REQUEST] : new BadRequestException().message,
    [HttpStatus.UNAUTHORIZED] : new UnauthorizedException().message,
    [HttpStatus.PAYMENT_REQUIRED] : "PaymentRequired",
    [HttpStatus.FORBIDDEN] : new ForbiddenException().message,
    [HttpStatus.NOT_FOUND] : new NotFoundException().message,
    [HttpStatus.METHOD_NOT_ALLOWED] : new MethodNotAllowedException().message,
    [HttpStatus.NOT_ACCEPTABLE] : new NotAcceptableException().message,
    [HttpStatus.REQUEST_TIMEOUT] : new RequestTimeoutException().message,
    [HttpStatus.CONFLICT] : new ConflictException().message,
    [HttpStatus.PAYLOAD_TOO_LARGE] : new PayloadTooLargeException().message,
    [HttpStatus.URI_TOO_LONG] :  "URI Too Long",
    [HttpStatus.TOO_MANY_REQUESTS] : ApiTooManyRequestsResponse().name,
    [HttpStatus.INTERNAL_SERVER_ERROR] : new InternalServerErrorException().message,
    [HttpStatus.NOT_IMPLEMENTED] : new NotImplementedException().message,
    [HttpStatus.BAD_GATEWAY] : new BadGatewayException().message,
    [HttpStatus.SERVICE_UNAVAILABLE] : new ServiceUnavailableException().message,
    [HttpStatus.GATEWAY_TIMEOUT] : new GatewayTimeoutException().message,
}