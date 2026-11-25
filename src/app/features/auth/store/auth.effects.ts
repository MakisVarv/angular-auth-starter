import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
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
} from './auth.actions';

export const loginEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(Auth)) =>
    actions$.pipe(
      ofType(loginRequested),

      exhaustMap(({ credentials }) =>
        authService.login(credentials).pipe(
          map((response) => loginSucceeded({ user: response.user })),
          catchError(() => of(loginFailed())),
        ),
      ),
    ),
  { functional: true },
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
