import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { StyleClassModule } from 'primeng/styleclass';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, BadgeModule, StyleClassModule],
})
export class Sidebar {
  private readonly userService = inject(UserService);
  protected readonly currentUser = this.userService.currentUser;
}
