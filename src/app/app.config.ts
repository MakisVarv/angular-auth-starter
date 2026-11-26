import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { authReducer } from './features/auth/store/auth.reducer';
import { provideEffects } from '@ngrx/effects';
import {
  loginEffect,
  loginFailToastEffect,
  registerEffect,
  registerFailToastEffect,
  registerSuccessToastEffect,
  restoreSessionEffect,
} from './features/auth/store/auth.effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './features/auth/interceptors/auth-interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(routes),
    provideStore(),
    provideState('auth', authReducer),
    provideEffects({
      loginEffect,
      loginFailToastEffect,
      registerEffect,
      registerSuccessToastEffect,
      registerFailToastEffect,
      restoreSessionEffect,
    }),
  ],
};
