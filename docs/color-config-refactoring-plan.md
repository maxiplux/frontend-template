# Color Configuration Refactoring Plan

## Problem Statement

There is **duplicated color configuration** between two files:

1. [`app.config.ts`](file:///home/juan/Documentos/projects/frontend/src/app/app.config.ts) - Contains PrimeNG theme preset with color definitions
2. [`color-config.service.ts`](file:///home/juan/Documentos/projects/frontend/src/app/features/color-config/services/color-config.service.ts) - Contains DEFAULT_CONFIG with color values

Both files define the same color palette values (slate, sky tones), creating maintenance burden and potential inconsistency.

---

## Code Duplication Analysis

### Duplicated Values

| Color Token       | app.config.ts | color-config.service.ts              |
| ----------------- | ------------- | ------------------------------------ |
| Sky 500 (primary) | `#0ea5e9`     | `#0ea5e9` (light.primary)            |
| Sky 400           | `#38bdf8`     | `#38bdf8` (dark.primary)             |
| Slate 50          | `#f8fafc`     | `#f8fafc` (light.surface, dark.text) |
| Slate 950         | `#0f172a`     | `#0f172a` (light.text, dark.surface) |
| Slate 500         | `#64748b`     | `#64748b` (light.muted)              |
| Slate 400         | `#94a3b8`     | `#94a3b8` (dark.muted)               |
| Slate 200         | `#e2e8f0`     | `#e2e8f0` (light.border)             |
| Slate 700         | `#334155`     | `#334155` (dark.border)              |

> [!WARNING]
> If a developer updates colors in one file but forgets the other, the application will have inconsistent theming.

---

## Recommended Solution

### Create a Single Source of Truth

Create a centralized color tokens file that both configurations reference.

---

## Implementation Tasks

### Phase 1: Create Shared Color Tokens

- [ ] **Task 1.1**: Create new file `src/app/core/theme/color-tokens.ts`

  - Define all primitive colors (slate, sky, orange palettes)
  - Export typed color constants
  - Include TypeScript types for type safety

- [ ] **Task 1.2**: Create semantic color mappings in `src/app/core/theme/semantic-colors.ts`
  - Map primitives to semantic tokens (primary, surface, text, muted, border)
  - Define light and dark mode variations
  - Export `DEFAULT_COLOR_CONFIG` from this file

---

### Phase 2: Refactor app.config.ts

- [ ] **Task 2.1**: Import color tokens into `app.config.ts`

  - Replace hardcoded hex values with imported tokens
  - Maintain PrimeNG preset structure

- [ ] **Task 2.2**: Verify PrimeNG theme compilation
  - Run application to ensure theme applies correctly
  - Test both light and dark modes

---

### Phase 3: Refactor ColorConfigService

- [ ] **Task 3.1**: Update `color-config.service.ts`

  - Import `DEFAULT_COLOR_CONFIG` from shared location
  - Remove duplicate `DEFAULT_CONFIG` constant
  - Update type imports if needed

- [ ] **Task 3.2**: Verify service functionality
  - Test color persistence in localStorage
  - Test import/export functionality
  - Test reset to defaults

---

### Phase 4: Testing & Documentation

- [ ] **Task 4.1**: Write unit tests

  - Test that both configurations use same values
  - Test color token types

- [ ] **Task 4.2**: Update documentation
  - Document the color system architecture
  - Add inline comments explaining token usage

---

## Proposed File Structure

```
src/app/core/theme/
├── index.ts                 # Barrel export
├── color-tokens.ts          # Primitive color palette (hex values)
├── semantic-colors.ts       # Light/dark theme mappings
└── theme.types.ts           # TypeScript interfaces
```

---

## Example Implementation

### color-tokens.ts

```typescript
// Primitive color palettes - Single Source of Truth
export const SLATE = {
  50: '#f8fafc',
  100: '#f1f5f9',
  200: '#e2e8f0',
  300: '#cbd5e1',
  400: '#94a3b8',
  500: '#64748b',
  600: '#475569',
  700: '#334155',
  800: '#1e293b',
  900: '#0f172a',
  950: '#020617',
} as const;

export const SKY = {
  50: '#f0f9ff',
  100: '#e0f2fe',
  200: '#bae6fd',
  300: '#7dd3fc',
  400: '#38bdf8',
  500: '#0ea5e9',
  600: '#0284c7',
  700: '#0369a1',
  800: '#075985',
  900: '#0c4a6e',
  950: '#082f49',
} as const;

export const ORANGE = {
  50: '#fff7ed',
  100: '#ffedd5',
  200: '#fed7aa',
  300: '#fdba74',
  400: '#fb923c',
  500: '#f97316',
  600: '#ea580c',
  700: '#c2410c',
  800: '#9a3412',
  900: '#7c2d12',
  950: '#431407',
} as const;
```

### semantic-colors.ts

```typescript
import { SLATE, SKY } from './color-tokens';
import type { ColorConfig } from './theme.types';

export const DEFAULT_COLOR_CONFIG: ColorConfig = {
  light: {
    primary: SKY[500],
    surface: SLATE[50],
    text: SLATE[900],
    muted: SLATE[500],
    border: SLATE[200],
  },
  dark: {
    primary: SKY[400],
    surface: SLATE[900],
    text: SLATE[50],
    muted: SLATE[400],
    border: SLATE[700],
  },
};
```

---

## Benefits

1. **Single Source of Truth** - Color values defined once
2. **Type Safety** - TypeScript `as const` ensures immutability
3. **Maintainability** - Update colors in one place
4. **Consistency** - Both PrimeNG and custom service use same values
5. **Developer Experience** - IntelliSense for color tokens

---

## Risks & Mitigations

| Risk                    | Impact | Mitigation                                      |
| ----------------------- | ------ | ----------------------------------------------- |
| Breaking PrimeNG preset | High   | Test theme compilation before merging           |
| localStorage migration  | Medium | Add migration logic for existing stored configs |
| Import path changes     | Low    | Use barrel exports for clean imports            |

---

## Estimated Effort

| Phase                         | Time Estimate |
| ----------------------------- | ------------- |
| Phase 1: Create Shared Tokens | 1 hour        |
| Phase 2: Refactor app.config  | 30 minutes    |
| Phase 3: Refactor Service     | 30 minutes    |
| Phase 4: Testing & Docs       | 1 hour        |
| **Total**                     | **~3 hours**  |

---

## Acceptance Criteria

- [ ] No duplicate color hex values exist between files
- [ ] All tests pass
- [ ] Light and dark themes render correctly
- [ ] Color config persistence works as before
- [ ] Import/export functionality works as before
