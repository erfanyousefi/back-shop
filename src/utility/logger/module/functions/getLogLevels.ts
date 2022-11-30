
import { LogLevel } from '@nestjs/common/services/logger.service';
import { NodeEnviorment } from 'src/common/enums/global.enum';
 
function getLogLevels(): LogLevel[] {
  if (process.env.NODE_ENV == NodeEnviorment.PROD) {
    return ['log', 'warn', 'error'];
  }
  return ['error', 'warn', 'log', 'verbose', 'debug'];
}
 
export default getLogLevels;
