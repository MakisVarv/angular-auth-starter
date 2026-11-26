import { createReducer, on } from '@ngrx/store';
import { initialAuthState } from './auth.state';
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

export const authReducer = createReducer(
  initialAuthState,

  on(loginSucceeded, (state, action) => {
    return { ...state, user: action.user, status: 'authenticated', isLoggingIn: false };
  }),

  on(loginRequested, (state) => {
    return { ...state, isLoggingIn: true };
  }),

  on(loginFailed, (state) => {
    return { ...state, user: null, status: 'unauthenticated', isLoggingIn: false };
  }),

  on(registerSucceeded, (state) => ({
    ...state,
    isRegistering: false,
    registrationStatus: 'success',
  })),

  on(registerFailed, (state) => ({
    ...state,
    isRegistering: false,
    registrationStatus: 'error',
  })),

  on(registerRequested, (state) => ({
    ...state,
    isRegistering: true,
    registrationStatus: 'idle',
  })),

  on(restoreSessionSucceeded, (state, action) => ({
    ...state,
    user: action.user,
    status: 'authenticated',
  })),

  on(restoreSessionFailed, (state) => ({
    ...state,
    user: null,
    status: 'unauthenticated',
  })),

  on(restoreSessionRequested, (state) => ({
    ...state,
    status: 'checking',
  })),
);
