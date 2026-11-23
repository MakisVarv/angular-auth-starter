import { createFeatureSelector, createSelector } from '@ngrx/store';
import type { AuthState } from './auth.state';

export const selectAuthState = createFeatureSelector<AuthState>('auth');
export const selectAuthStatus = createSelector(selectAuthState, (state) => {
  return state.status;
});
