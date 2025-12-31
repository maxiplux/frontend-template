import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Component to display an empty state message with an optional icon and title.
 * Used when list or data views have no content to show.
 */
@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyStateComponent {
  /** The icon class to display (e.g., 'pi-inbox') */
  readonly icon = input<string>('pi-inbox');
  /** The title of the empty state */
  readonly title = input<string>('No data');
  /** An optional descriptive message */
  readonly message = input<string>();
}
