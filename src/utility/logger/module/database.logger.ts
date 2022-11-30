
import { Logger as TypeOrmLogger } from 'typeorm';
import { Logger as NestLogger } from '@nestjs/common';
 
class DatabaseLogger implements TypeOrmLogger {
  private readonly logger = new NestLogger('SQL');  
 
  logQuery(query: string, parameters?: unknown[]) {
    this.logger.log(`${this.logQuery.name} - ${query} - Parameters: ${this.stringifyParameters(parameters)}`);
  }
 
  logQueryError(error: string, query: string, parameters?: unknown[]) {
    this.logger.error(`${this.logQueryError.name} - ${query} -- Parameters: ${this.stringifyParameters(parameters)} -- ${error}`);
  }
 
  logQuerySlow(time: number, query: string, parameters?: unknown[]) {
    this.logger.warn(`${this.logQuerySlow.name} - Time: ${time} -- Parameters: ${this.stringifyParameters(parameters)} -- ${query}`);
  }
 
  logMigration(message: string) {
    this.logger.log(message);
  }
 
  logSchemaBuild(message: string) {
    this.logger.log(message);
  }
 
  log(level: 'log' | 'info' | 'warn', message: string) {
    if (level === 'log') {
      return this.logger.log(message);
    }
    if (level === 'info') {
      return this.logger.debug(message);
    }
    if (level === 'warn') {
      return this.logger.warn(message);
    }
    if (level === 'error') {
      return this.logger.error(message);
    }
  }
 
  private stringifyParameters(parameters?: unknown[]) {
    try {
      return JSON.stringify(parameters);
    } catch {
      return '';
    }
  }
}
 
export default DatabaseLogger;