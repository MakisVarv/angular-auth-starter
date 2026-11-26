import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { toast } from 'ngx-sonner';
import { tap } from 'rxjs';
import { Auth } from '../services/auth';
import {
  loginFailed,
  loginRequested,
  loginSucceeded,
  registerFailed,
  registerRequested,
  registerSucceeded,
  restoreSessionFailed,
  restoreSessionRequested,
  restoreSessionSucceeded,
} from './auth.actions';
import { Token } from '../services/token';
import { TokenRefresh } from '../services/token-refresh';

export const loginEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(Auth), tokenService = inject(Token)) =>
    actions$.pipe(
      ofType(loginRequested),

      exhaustMap(({ credentials }) =>
        authService.login(credentials).pipe(
          tap((response) => {
            tokenService.setToken(response.access_token);
          }),
          map((response) => loginSucceeded({ user: response.user })),

          catchError(() => of(loginFailed())),
        ),
      ),
    ),
  { functional: true },
);
export const loginFailToastEffect = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(loginFailed),
      tap(() => {
        toast.error('Login failed. Please try again.');
      }),
    ),
  { functional: true, dispatch: false },
);

export const registerEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(Auth)) =>
    actions$.pipe(
      ofType(registerRequested),

      exhaustMap(({ credentials }) =>
        authService.register(credentials).pipe(
          map((response) => registerSucceeded({ user: response })),
          catchError(() => of(registerFailed())),
        ),
      ),
    ),
  { functional: true },
);
export const registerSuccessToastEffect = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(registerSucceeded),
      tap(() => {
        toast.success('Registration successful!');
      }),
    ),
  { functional: true, dispatch: false },
);
export const registerFailToastEffect = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(registerFailed),
      tap(() => {
        toast.error('Registration failed. Please try again.');
      }),
    ),
  { functional: true, dispatch: false },
);
export const restoreSessionEffect = createEffect(
  (
    actions$ = inject(Actions),
    tokenRefresh = inject(TokenRefresh),
    tokenService = inject(Token),
    authService = inject(Auth),
  ) =>
    actions$.pipe(
      ofType(restoreSessionRequested),
      exhaustMap(() =>
        tokenRefresh.refreshAccessToken().pipe(
          switchMap((response) => {
            if (response === null) {
              tokenService.clearToken();
              return of(restoreSessionFailed());
            }

            tokenService.setToken(response.access_token);
            return authService
              .getCurrentUser()
              .pipe(map((user) => restoreSessionSucceeded({ user })));
          }),
        ),
      ),
    ),
  { functional: true },
);
