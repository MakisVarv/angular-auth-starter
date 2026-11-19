import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './features/auth/pages/login/login';
import { Register } from './features/auth/pages/register/register';
import { NotFound } from './pages/not-found/not-found';
import { ChangeEmail } from './features/auth/pages/change-email/change-email';
import { Profile } from './features/auth/pages/profile/profile';
import { ChangePassword } from './features/auth/pages/change-password/change-password';
import { LogoutAll } from './features/auth/pages/logout-all/logout-all';
import { ResetPassword } from './features/auth/pages/reset-password/reset-password';

export const routes: Routes = [
  { path: '', component: Home },
  { path: '**', component: NotFound },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'profile', component: Profile },
  { path: 'change-email', component: ChangeEmail },
  { path: 'change-password', component: ChangePassword },
  { path: 'reset-password', component: ResetPassword },
  { path: 'logout-all', component: LogoutAll },
];
