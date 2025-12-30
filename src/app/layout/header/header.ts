import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { StyleClassModule } from 'primeng/styleclass';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { AuthService, ThemeService, UserService } from '../../core/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, RouterLink, StyleClassModule, ToggleSwitch],
})
export class Header {
  protected readonly themeService = inject(ThemeService);
  private readonly userService = inject(UserService);
  private readonly authService = inject(AuthService);

  protected readonly currentUser = this.userService.currentUser;

  protected signOut(): void {
    this.authService.logout();
  }
}
