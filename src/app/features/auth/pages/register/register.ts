import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Auth } from '../../services/auth';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { registerRequested } from '../../store/auth.actions';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {
  private readonly authService = inject(Auth);
  private readonly store = inject(Store);
  title = 'Register';

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

    const credentials = this.registerForm.getRawValue();

    this.store.dispatch(registerRequested({ credentials }));
  }
}
