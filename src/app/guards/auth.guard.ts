import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { take, map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isloggedIn$.pipe(
    take(1),
    map((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigate(['/admin/login']);
        return false;
      }
      return true;
    })
  );
};
