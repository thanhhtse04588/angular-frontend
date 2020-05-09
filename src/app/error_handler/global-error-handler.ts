import { SharedService } from './../shared/service/shared.service';

import { Router } from '@angular/router';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LoggingService } from '../services/logging.service';
import { ErrorService } from '../services/error.service';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector, private router: Router,private sharedService: SharedService) { }

  handleError(error: Error | HttpErrorResponse) {
    const errorService = this.injector.get(ErrorService);
    const logger = this.injector.get(LoggingService);
    const notifier = this.injector.get(NotificationService);
    let message: string;
    let sideError: string;
    let stackTrace;
    if (error instanceof HttpErrorResponse) {
      // Server error
      sideError = 'Server error';
      message = errorService.getServerErrorMessage(error);
      // stackTrace = errorService.getServerErrorStackTrace(error);
      // notifier.showError(message);
    } else {
      // Client Error
      sideError = 'Client Error';
      message = 'Lỗi của Thành : ' + errorService.getClientErrorMessage(error);
      // notifier.showError(message);
    }
    // Always log errors
    // logger.logError(message, stackTrace);
    // this.sharedService.openSnackBar(sideError);
    console.error(error);
    // this.router.navigate(['error'])
  }
}