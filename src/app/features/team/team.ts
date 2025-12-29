import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { EmptyState } from '../../shared/components/empty-state/empty-state';

@Component({
  selector: 'app-team',
  templateUrl: './team.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHeader, EmptyState],
})
export class Team {}
