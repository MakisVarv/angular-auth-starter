import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  title = 'Production-oriented starter';
  subTitle = 'Build on a solid foundation';
  description =
    'A reusable application foundation with authentication, role-based access control, user management, and a clean frontend-backend architecture.';
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
