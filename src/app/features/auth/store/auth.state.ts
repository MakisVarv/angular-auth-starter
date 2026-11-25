import type { User } from '../../users/types';

export type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated';

export interface AuthState {
  user: User | null;
  status: AuthStatus;
  isLoggingIn: boolean;
  isRegistering: boolean;
  registrationStatus: RegistrationStatus;
}

export const initialAuthState: AuthState = {
  user: null,
  status: 'checking',
  isLoggingIn: false,
  isRegistering: false,
  registrationStatus: 'idle',
};
export type RegistrationStatus = 'idle' | 'success' | 'error';
