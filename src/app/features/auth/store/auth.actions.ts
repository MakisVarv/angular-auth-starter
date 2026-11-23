import { createAction, props } from '@ngrx/store';
import { User } from '../../users/types';
import { LoginCredentials } from '../types';

export const loginSucceeded = createAction('[Auth] Login Succeeded', props<{ user: User }>());
export const loginRequested = createAction(
  '[Auth] Login Requested',
  props<{ credentials: LoginCredentials }>(),
);
export const loginFailed = createAction('[Auth] Login Failed');
