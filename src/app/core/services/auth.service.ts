import { Injectable, signal } from '@angular/core';

/**
 * Service to manage user authentication state.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  /** Internal authentication state */
  private readonly _isAuthenticated = signal(false);

  /**
   * Read-only signal indicating whether the user is currently authenticated.
   */
  readonly isAuthenticated = this._isAuthenticated.asReadonly();

  /**
   * Authenticates the user.
   */
  login(): void {
    this._isAuthenticated.set(true);
  }

  /**
   * Logs out the user.
   */
  logout(): void {
    this._isAuthenticated.set(false);
  }
}
