import { Injectable, signal } from '@angular/core';

export interface User {
  name: string;
  avatar: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly _currentUser = signal<User>({
    name: 'Amy Elsner',
    avatar:
      'https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/avatars/avatar-amyels.png',
  });

  readonly currentUser = this._currentUser.asReadonly();
}
