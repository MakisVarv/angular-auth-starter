import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Service()
export class Auth {
  private readonly http = inject(HttpClient);
}
