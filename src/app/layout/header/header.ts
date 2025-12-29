import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { StyleClassModule } from 'primeng/styleclass';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [StyleClassModule],
})
export class Header {
  private readonly userService = inject(UserService);
  protected readonly currentUser = this.userService.currentUser;
}
