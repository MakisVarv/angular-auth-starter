import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Token } from '../services/token';
import { inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { catchError, switchMap, throwError } from 'rxjs';
import { TokenRefresh } from '../services/token-refresh';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(Token);
  const token = tokenService.getToken();
  const tokenRefresh = inject(TokenRefresh);

  if (!req.url.startsWith(`${environment.apiUrl}/`)) {
    return next(req);
  }
  if (req.url === `${environment.apiUrl}/auth/refresh`) {
    return next(req);
  }
  if (req.headers.has('Authorization')) {
    return next(req);
  }

  if (!token) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authReq).pipe(
    catchError((error: unknown) => {
      if (
        error instanceof HttpErrorResponse &&
        error.status === 401 &&
        error.error?.code === 'access_token_expired'
      ) {
        return tokenRefresh.refreshAccessToken().pipe(
          switchMap((response) => {
            if (response === null) {
              return throwError(() => error);
            } else {
              const token = response.access_token;
              tokenService.setToken(token);
              const retryReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${token}`,
                },
              });
              return next(retryReq);
            }
          }),
        );
      }

      return throwError(() => error);
    }),
  );
};
