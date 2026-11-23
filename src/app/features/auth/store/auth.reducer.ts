import { createReducer, on } from '@ngrx/store';
import { initialAuthState } from './auth.state';
import { loginRequested, loginSucceeded } from './auth.actions';

export const authReducer = createReducer(
  initialAuthState,

  on(loginSucceeded, (state, action) => {
    return { ...state, user: action.user, status: 'authenticated', isLoggingIn: false };
  }),
  on(loginRequested, (state) => {
    return { ...state, isLoggingIn: true };
  }),
);
