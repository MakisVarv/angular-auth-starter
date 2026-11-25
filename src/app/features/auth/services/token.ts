import { Service } from '@angular/core';

@Service()
export class Token {
  private accessToken: string | null = null;
  setToken(token: string): void {
    this.accessToken = token;
  }
  getToken(): string | null {
    return this.accessToken;
  }
  clearToken(): void {
    this.accessToken = null;
  }
}
