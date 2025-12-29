import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StyleClassModule } from 'primeng/styleclass';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.html',
  styleUrl: './user-menu.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, StyleClassModule],
})
export class UserMenu {
  private readonly userService = inject(UserService);
  private readonly authService = inject(AuthService);

  protected readonly currentUser = this.userService.currentUser;

  protected signOut(): void {
    this.authService.logout();
  }
}
