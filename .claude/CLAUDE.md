# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## Development Commands

- `npm start` - Start development server (runs on http://localhost:4200)
- `npm run build` - Build for production (outputs to `dist/`)
- `npm run watch` - Build in watch mode with development configuration
- `npm test` - Run unit tests with Vitest
- `ng generate component <name>` - Generate new component

## Application Architecture

### Project Structure

The application follows a feature-based architecture:

- `src/app/core/` - Singleton services, guards, and interceptors used throughout the app
  - `services/` - Core services (AuthService, UserService, ThemeService)
  - `guards/` - Route guards (authGuard)
  - `interceptors/` - HTTP interceptors (authInterceptor)
- `src/app/features/` - Feature modules with lazy-loaded routes
  - Each feature has its own routes file (`*.routes.ts`)
  - Features: dashboard, bookmarks, team, messages, calendar, overview, domains, reports, profile, settings
- `src/app/layout/` - Layout components (MainLayout, Header, Sidebar, UserMenu)
- `src/app/shared/` - Shared components, directives, and pipes used across features
- `src/app/app.routes.ts` - Main routing configuration with lazy-loaded feature routes

### Routing Architecture

- All feature routes are lazy-loaded using `loadChildren()` in `app.routes.ts`
- Features define their own routes in `<feature-name>.routes.ts` files
- Main layout (`MainLayout`) wraps all feature routes
- Default route redirects to `/dashboard`
- All unmatched routes redirect to dashboard

### UI Framework & Styling

- **PrimeNG** (v21) - Primary component library with custom theme preset (Nora)
- **Tailwind CSS** (v4.1) - Utility-first CSS framework with PrimeUI plugin
- **Lucide Angular** - Icon library
- Custom color scheme defined in `app.config.ts`:
  - Primary: Sky (blue) palette
  - Surface: Slate palette
  - Accent: Orange palette
- Dark mode controlled via `.dark` class on `<html>` element

### State Management

- **Signals** are the primary state management mechanism (Angular v21+)
- ThemeService uses signals to manage theme state with localStorage persistence
- AuthService uses signals for authentication state

### HTTP & Authentication

- HTTP client configured with `authInterceptor` in `app.config.ts`
- Authentication interceptor is currently a placeholder for future token logic
- `authGuard` protects routes using `AuthService.isAuthenticated()` signal

## TypeScript Best Practices

- Use strict type checking (enabled in `tsconfig.json`)
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

### Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- When using external templates/styles, use paths relative to the component TS file.

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.
- Do not write arrow functions in templates (they are not supported).

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection

## Testing

- Test framework: **Vitest** (v4)
- Test files use `.spec.ts` extension
- TypeScript configuration for tests in `tsconfig.spec.json`