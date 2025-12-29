import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageHeader } from '../../shared/components/page-header/page-header';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHeader],
})
export class Settings {}
