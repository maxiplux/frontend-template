import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _isAuthenticated = signal(false);
  readonly isAuthenticated = this._isAuthenticated.asReadonly();

  login(): void {
    this._isAuthenticated.set(true);
  }

  logout(): void {
    this._isAuthenticated.set(false);
  }
}
