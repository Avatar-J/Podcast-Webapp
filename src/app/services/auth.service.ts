import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  throwError,
  tap,
  Observable,
  retry,
} from 'rxjs';
import { ApiService } from './api.service';
import { ErrorService } from './error.service';
import { Router } from '@angular/router';
import { RegisterUser } from '../Models/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  api = inject(ApiService);
  errorHandler = inject(ErrorService);
  router = inject(Router);

  private tokenKey = 'auth_token';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isloggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() {}

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  register(credentials: RegisterUser): Observable<any> {
    return this.api.register(credentials).pipe(retry(3));
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.api.login(credentials).pipe(
      tap((response) => {
        const token = response.data?.token;
        if (token) {
          localStorage.setItem(this.tokenKey, token);
          this.isLoggedInSubject.next(true);
          this.router.navigate(['/admin/confessions']);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.isLoggedInSubject.next(false);
        let errorMessage = 'Login failed. Please try again.';
        if (error.status === 401) {
          errorMessage = 'Invalid email or password.';
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/admin/login']);
  }
}
