import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs';

import { Auth } from '../services/auth';
import { loginRequested, loginSucceeded } from './auth.actions';

export const loginEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(Auth)) =>
    actions$.pipe(
      ofType(loginRequested),

      exhaustMap(({ credentials }) =>
        authService
          .login(credentials)
          .pipe(map((response) => loginSucceeded({ user: response.user }))),
      ),
    ),
  { functional: true },
);
