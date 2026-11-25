import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loginRequested } from '../../store/auth.actions';
import { selectIsLoggingIn } from '../../store/auth.selectors';
@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private readonly store = inject(Store);
  readonly isLoggingIn = this.store.selectSignal(selectIsLoggingIn);
  title = 'Login';

  loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
  onSubmit(): void {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) {
      return;
    }

    const credentials = this.loginForm.getRawValue();

    this.store.dispatch(loginRequested({ credentials }));
  }
}
