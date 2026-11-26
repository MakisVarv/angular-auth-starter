import { Component, signal, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgxSonnerToaster } from 'ngx-sonner';
import { restoreSessionRequested } from './features/auth/store/auth.actions';

@Component({
  imports: [RouterOutlet, NgxSonnerToaster],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  private readonly store = inject(Store);
  protected readonly title = signal('angular-auth-starter');
  ngOnInit(): void {
    this.store.dispatch(restoreSessionRequested());
  }
}
