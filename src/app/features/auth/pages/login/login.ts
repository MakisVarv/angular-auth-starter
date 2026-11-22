import { Component, inject } from '@angular/core';
import { Auth } from '../../services/auth';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private readonly authService = inject(Auth);
  title = 'Login';

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  onSubmit(): void {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      return;
    }
  }
}
