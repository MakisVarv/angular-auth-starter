import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginCredentials, LoginResponse, RegisterCredentials, UpdateProfileData } from '../types';
import { Observable, of } from 'rxjs';
import { User } from '../../users/types';
import { getCookie } from '../../../shared/utils/cookies';
import { MessageResponse } from '../../../shared/api/types';

@Service()
export class Auth {
  private readonly http = inject(HttpClient);

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/auth/login', credentials);
  }
  register(credentials: RegisterCredentials): Observable<User> {
    return this.http.post<User>('/auth/register', credentials);
  }
  logout(): Observable<void> {
    const csrfToken = getCookie('csrf_refresh_token');
    if (csrfToken == null) {
      return of(void 0);
    }
    return this.http.post<void>(
      '/auth/logout',
      {},
      {
        headers: {
          'X-CSRF-TOKEN': csrfToken,
        },
        withCredentials: true,
      },
    );
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>('/auth/me');
  }
  updateProfile(data: UpdateProfileData): Observable<User> {
    return this.http.patch<User>('/auth/me', data);
  }
  forgotPassword(email: string): Observable<MessageResponse> {
    return this.http.post<MessageResponse>('/auth/forgot-password', { email });
  }
  resetPassword(token: string, newPassword: string): Observable<MessageResponse> {
    return this.http.post<MessageResponse>('/auth/reset-password', {
      token,
      new_password: newPassword,
    });
  }
  changePassword(freshAccessToken: string, newPassword: string): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(
      '/auth/change-password',
      {
        new_password: newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${freshAccessToken}`,
        },
      },
    );
  }
  changeEmail(freshAccessToken: string, newEmail: string): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(
      '/auth/change-email',
      {
        new_email: newEmail,
      },
      {
        headers: {
          Authorization: `Bearer ${freshAccessToken}`,
        },
      },
    );
  }
  reauthenticate(currentPassword: string): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>('/auth/reauthenticate', {
      current_password: currentPassword,
    });
  }
  logoutAll(freshAccessToken: string): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(
      '/auth/logout-all',
      {},
      {
        headers: {
          Authorization: `Bearer ${freshAccessToken}`,
        },
      },
    );
  }
}
