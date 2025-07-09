import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor() {}
  handle(error: HttpErrorResponse): void {
    let message = 'An unexpected error occurred.';

    if (error.status === 0) {
      message = 'Network error. Please check your connection.';
    } else if (error.status === 404) {
      message = 'Requested resource not found.';
    } else if (error.status === 500) {
      message = 'Server is down.';
    } else if (error.status === 401 || error.status === 403) {
      message = error.error?.error || 'Unauthorized. Please log in again.';
    } else if (typeof error.error === 'string') {
      message = error.error;
    }

    console.log(message);
  }
}
