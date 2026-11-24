import type { User } from '../../users/types';

export type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated';

export interface AuthState {
  user: User | null;
  status: AuthStatus;

  isLoggingIn: boolean;
  isRegistering: boolean;
}

export const initialAuthState: AuthState = {
  user: null,
  status: 'checking',
  isLoggingIn: false,
  isRegistering: false,
};
