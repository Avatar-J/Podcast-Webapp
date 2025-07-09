import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError, throwError, retry } from 'rxjs';
import { ErrorService } from './error.service';
import { LoginResponse } from '../Models/apiResponse';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  http = inject(HttpClient);
  errorHandler = inject(ErrorService);

  private baseUrl = 'https://api.rantsnconfess.com/v1';

  login(credentials: { email: string; password: string }) {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/login`, credentials)
      .pipe(retry(3));
  }
}
