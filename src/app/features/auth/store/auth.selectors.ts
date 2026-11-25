import { createFeatureSelector, createSelector } from '@ngrx/store';
import type { AuthState } from './auth.state';

export const selectAuthState = createFeatureSelector<AuthState>('auth');
export const selectAuthStatus = createSelector(selectAuthState, (state) => {
  return state.status;
});
export const selectIsRegistering = createSelector(selectAuthState, (state) => {
  return state.isRegistering;
});
export const selectRegistrationStatus = createSelector(selectAuthState, (state) => {
  return state.registrationStatus;
});
