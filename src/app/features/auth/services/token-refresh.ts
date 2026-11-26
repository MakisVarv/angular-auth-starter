import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { getCookie } from '../../../shared/utils/cookies';
import { RefreshTokenResponse } from '../types';
import { Observable, of } from 'rxjs';

@Service()
export class TokenRefresh {
  private readonly http = inject(HttpClient);

  refreshAccessToken(): Observable<RefreshTokenResponse | null> {
    const csrfToken = getCookie('csrf_refresh_token');

    if (csrfToken == null) {
      return of(null);
    }

    return this.http.post<RefreshTokenResponse>(
      '/auth/refresh',
      {},
      {
        headers: {
          'X-CSRF-TOKEN': csrfToken,
        },
      },
    );
  }
}
