import { HttpInterceptorFn } from '@angular/common/http';
import { Token } from '../services/token';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(Token);
  const token = tokenService.getToken();
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
