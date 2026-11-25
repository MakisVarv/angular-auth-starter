import { HttpInterceptorFn } from '@angular/common/http';
import { Token } from '../services/token';
import { inject } from '@angular/core';
import { environment } from '../../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(Token);
  const token = tokenService.getToken();
  if (!req.url.startsWith(`${environment.apiUrl}/`)) {
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
  return next(authReq);
};
