import { createAction, props } from '@ngrx/store';
import { User } from '../../users/types';

export const loginSucceeded = createAction('[Auth] Login Succeeded', props<{ user: User }>());
