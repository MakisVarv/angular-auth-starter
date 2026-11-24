import { createAction, props } from '@ngrx/store';
import { User } from '../../users/types';
import { LoginCredentials, RegisterCredentials } from '../types';

export const loginSucceeded = createAction('[Auth] Login Succeeded', props<{ user: User }>());
export const loginRequested = createAction(
  '[Auth] Login Requested',
  props<{ credentials: LoginCredentials }>(),
);
export const loginFailed = createAction('[Auth] Login Failed');
export const registerSucceeded = createAction('[Auth] Register Succeeded', props<{ user: User }>());
export const registerRequested = createAction(
  '[Auth] Register Requested',
  props<{ credentials: RegisterCredentials }>(),
);
export const registerFailed = createAction('[Auth] Register Failed');
