import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginCredentials, LoginResponse, RegisterCredentials, UpdateProfileData } from '../types';
import { Observable, of } from 'rxjs';
import { User } from '../../users/types';
import { getCookie } from '../../../shared/utils/cookies';
import { MessageResponse } from '../../../shared/api/types';
import { environment } from '../../../../environments/environment';
@Service()
export class Auth {
  private readonly http = inject(HttpClient);
  private readonly authUrl = `${environment.apiUrl}/auth`;
  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.authUrl}/login`, credentials, {
      withCredentials: true,
    });
  }
  register(credentials: RegisterCredentials): Observable<User> {
    return this.http.post<User>(`${this.authUrl}/register`, credentials, { withCredentials: true });
  }
  logout(): Observable<void> {
    const csrfToken = getCookie('csrf_refresh_token');
    if (csrfToken == null) {
      return of(void 0);
    }
    return this.http.post<void>(
      `${this.authUrl}/logout`,
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
    return this.http.get<User>(`${this.authUrl}/me`, { withCredentials: true });
  }
  updateProfile(data: UpdateProfileData): Observable<User> {
    return this.http.patch<User>(`${this.authUrl}/me`, data, { withCredentials: true });
  }
  forgotPassword(email: string): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(
      `${this.authUrl}/forgot-password`,
      { email },
      { withCredentials: true },
    );
  }
  resetPassword(token: string, newPassword: string): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(
      `${this.authUrl}/reset-password`,
      {
        token,
        new_password: newPassword,
      },
      { withCredentials: true },
    );
  }
  changePassword(freshAccessToken: string, newPassword: string): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(
      `${this.authUrl}/change-password`,
      {
        new_password: newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${freshAccessToken}`,
        },
        withCredentials: true,
      },
    );
  }
  changeEmail(freshAccessToken: string, newEmail: string): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(
      `${this.authUrl}/change-email`,
      {
        new_email: newEmail,
      },
      {
        headers: {
          Authorization: `Bearer ${freshAccessToken}`,
        },
        withCredentials: true,
      },
    );
  }
  reauthenticate(currentPassword: string): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>(
      `${this.authUrl}/reauthenticate`,
      {
        current_password: currentPassword,
      },
      { withCredentials: true },
    );
  }
  logoutAll(freshAccessToken: string): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(
      `${this.authUrl}/logout-all`,
      {},
      {
        headers: {
          Authorization: `Bearer ${freshAccessToken}`,
        },
        withCredentials: true,
      },
    );
  }
}
