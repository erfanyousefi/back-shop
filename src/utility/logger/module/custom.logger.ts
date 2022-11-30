import { Injectable, ConsoleLogger } from '@nestjs/common';
import { ConsoleLoggerOptions } from '@nestjs/common/services/console-logger.service';
import { Request } from 'express';
import { IErrorLocation } from 'src/utility/history/interface/error.interface';
import getLogLevels from './functions/getLogLevels';
import LogsService from './logger.service';

@Injectable()
class CustomLogger extends ConsoleLogger {
  private readonly logsService: LogsService;

  constructor(context: string, options: ConsoleLoggerOptions, logsService: LogsService) {
    super(context, { ...options, logLevels: getLogLevels() });
    this.logsService = logsService;
  }

  log(message: string, context?: string) {
    super.log.apply(this, [message, context]);
    //this.logsService.saveErrorLog({ message, context, level: 'log' })
  }
  error(message: any, stack?: string, context?: string): void;
  error(message: any, ...optionalParams: any[]): void;
  error(message: unknown, stack?: unknown, context?: unknown): void {
    super.warn.apply(this, [message, stack, context]);
  }
  warn(message: string, context?: string) {
    super.warn.apply(this, [message, context]);
  }
  debug(message: string, context?: string) {
    super.debug.apply(this, [message, context]);
  }
  verbose(message: string, context?: string) {
    super.debug.apply(this, [message, context]);
  }
  setErrorLog(request: Request, error: Error & any, errorLocation: IErrorLocation) {
    error.level = "error"
    this.logsService.saveErrorLog(request, error, errorLocation)
  }
  setWarnLog(request: Request, error: Error & any, errorLocation: IErrorLocation) {
    error.level = 'warn'
    this.logsService.saveErrorLog(request, error, errorLocation)
  }
  setDebugLog(request: Request, error: Error & any, errorLocation: IErrorLocation) {
    error.level = 'debug'
    this.logsService.saveErrorLog(request, error, errorLocation)
  }
  setVerboseLog(request: Request, error: Error & any, errorLocation: IErrorLocation) {
    error.level = 'verbose'
    this.logsService.saveErrorLog(request, error, errorLocation)
  }
}

export default CustomLogger;