import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { getCookie } from '../../../shared/utils/cookies';
import { RefreshTokenResponse } from '../types';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Service()
export class TokenRefresh {
  private readonly http = inject(HttpClient);
  private readonly authUrl = `${environment.apiUrl}/auth`;

  refreshAccessToken(): Observable<RefreshTokenResponse | null> {
    const csrfToken = getCookie('csrf_refresh_token');

    if (csrfToken == null) {
      return of(null);
    }

    return this.http.post<RefreshTokenResponse>(
      `${this.authUrl}/refresh`,
      {},
      {
        headers: {
          'X-CSRF-TOKEN': csrfToken,
        },
        withCredentials: true,
      },
    );
  }
}
