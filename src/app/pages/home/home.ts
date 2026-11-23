import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAuthStatus } from '../../features/auth/store/auth.selectors';

@Component({
  imports: [RouterLink],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  private readonly store = inject(Store);
  readonly authStatus = this.store.selectSignal(selectAuthStatus);
  title = 'Production-oriented starter';
  subTitle = 'Build on a solid foundation';
  description =
    'A reusable application foundation with authentication, role-based access control, user management, and a clean frontend-backend architecture.';
  featuresTitle = 'Core capabilities';
  featuresDescription = 'Common application concerns already organized into a reusable foundation.';
  features = [
    {
      title: 'Authentication',
      description: 'Secure login, registration, session handling, and protected application areas.',
    },
    {
      title: 'Role-Based Access',
      description:
        'Permission-aware routes, navigation, and actions backed by server-side authorization.',
    },
    {
      title: 'User Management',
      description: 'Create, update, activate, deactivate, assign roles, and manage user accounts.',
    },
    {
      title: 'API-Ready Architecture',
      description:
        'A clean separation between frontend and backend designed for scalable application development.',
    },
  ];
}
