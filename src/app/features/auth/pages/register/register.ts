import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { registerRequested } from '../../store/auth.actions';
import { selectIsRegistering } from '../../store/auth.selectors';
import { toast } from 'ngx-sonner';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {
  private readonly store = inject(Store);
  readonly isRegistering = this.store.selectSignal(selectIsRegistering);
  title = 'Register';
  error = '';

  registerForm = new FormGroup({
    first_name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    last_name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    phone: new FormControl(''),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    confirm_password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
  onSubmit(): void {
    this.registerForm.markAllAsTouched();

    if (this.registerForm.invalid) {
      return;
    }
    const { confirm_password, ...credentials } = this.registerForm.getRawValue();
    if (credentials.password !== confirm_password) {
      this.error = "Passwords don't match!";
      return;
    }
    this.store.dispatch(registerRequested({ credentials }));
    this.error = '';
  }
}
