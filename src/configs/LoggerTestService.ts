import { LoggerService, Logger } from '@nestjs/common';

export default class LoggerConfigService implements LoggerService {
  log(message: string) {

  }
  error(message: string, trace: string) {
    
  }
  warn(message: string) {
    /* your implementation */
  }
  debug(message: string) {
    /* your implementation */
  }
  verbose(message: string) {
    /* your implementation */
  }
}