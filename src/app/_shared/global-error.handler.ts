import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LoggingService } from '../_services/logging/logging.service';
import { ErrorService } from '../_services/error.service';
import { LogLevels } from '../_enums/log-levels.enum';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) { }

  handleError(error: Error | HttpErrorResponse) {
    const errorService = this.injector.get(ErrorService);
    const logger = this.injector.get(LoggingService);

    let message;
    if (error instanceof HttpErrorResponse) {
      // Server error
      message = errorService.getServerErrorMessage(error);

    } else {
      // Client Error
      message = errorService.getClientErrorMessage(error);
    }

    // Always log errors
    logger.log(message, LogLevels.error);
  }
}