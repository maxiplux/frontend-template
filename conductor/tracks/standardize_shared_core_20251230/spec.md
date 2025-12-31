# Track Spec: Standardize Shared Components and Core Patterns

## Goal
The goal of this track is to establish a solid, production-ready foundation for the scaffolding application by standardizing the `shared` and `core` directories. This ensures that all future projects built from this scaffolding have a consistent architecture, high code quality, and follow Angular best practices (Signals, Standalone Components).

## Objectives
- Standardize the `core` directory for singleton services, guards, and interceptors.
- Standardize the `shared` directory for reusable components, directives, and pipes.
- Ensure all shared/core artifacts use Angular Signals for state management.
- Implement comprehensive documentation (JSDoc) for all public APIs.
- Achieve >80% test coverage for all standardized artifacts using Vitest.
- Align styling with Tailwind CSS v4 and PrimeNG v21 patterns.

## Technical Requirements
- **Angular:** v21+ using Standalone components and `inject()`.
- **State Management:** Use `signal()`, `computed()`, and `effect()` exclusively.
- **Styling:** Tailwind CSS utility classes; avoid custom CSS.
- **Testing:** Vitest for unit tests; use `ng test`.
- **Documentation:** JSDoc for all public classes, methods, and properties.

## Scope
- **Core:** `AuthService`, `ThemeService`, `UserService`, `AuthGuard`, `AuthInterceptor`.
- **Shared Components:** `EmptyStateComponent`, `PageHeaderComponent`.
- **Shared Pipes/Directives:** (To be identified and standardized).
