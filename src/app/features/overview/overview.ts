import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageHeader } from '../../shared/components/page-header/page-header';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHeader],
})
export class Overview {}
