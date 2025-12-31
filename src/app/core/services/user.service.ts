import { Injectable, signal } from '@angular/core';

/**
 * Represents a user in the system.
 */
export interface User {
  /** The user's full name */
  name: string;
  /** URL to the user's avatar image */
  avatar: string;
}

/**
 * Service to manage the current user's profile information.
 */
@Injectable({ providedIn: 'root' })
export class UserService {
  /** Internal state of the current user */
  private readonly _currentUser = signal<User>({
    name: 'Amy Elsner',
    avatar:
      'https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/avatars/avatar-amyels.png',
  });

  /**
   * Read-only signal of the current user.
   */
  readonly currentUser = this._currentUser.asReadonly();

  /**
   * Updates the current user's information.
   * @param user The new user data.
   */
  updateUser(user: User): void {
    this._currentUser.set(user);
  }
}
