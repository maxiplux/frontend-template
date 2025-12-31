import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Component to display a standard page header with a title and optional description.
 * Typically used at the top of feature pages.
 */
@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeaderComponent {
  /** The main title of the page (required) */
  readonly title = input.required<string>();
  /** An optional description or subtitle */
  readonly description = input<string>();
}

// Export with shorter name for convenience
export { PageHeaderComponent as PageHeader };
