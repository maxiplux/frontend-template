import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHeader],
})
export class Profile {
  private readonly userService = inject(UserService);
  protected readonly currentUser = this.userService.currentUser;
}
