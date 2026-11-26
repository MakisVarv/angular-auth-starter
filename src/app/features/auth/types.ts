import { User } from '../users/types';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string | null;
}
export interface UpdateProfileData {
  first_name: string;
  last_name: string;
  phone: string | null;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface RefreshTokenResponse {
  access_token: string;
}
