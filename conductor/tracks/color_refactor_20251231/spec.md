# Track Spec: Color Configuration Refactoring (Single Source of Truth)

## Overview
This track aims to eliminate code duplication between `app.config.ts` (PrimeNG theme preset) and `color-config.service.ts` (Application default config) by centralizing all color definitions into a single source of truth. This ensures consistency across the application and simplifies maintenance.

## Functional Requirements
- **Centralized Tokens:** Move all hardcoded hex values into a dedicated constants directory.
- **Semantic Mapping:** Map primitive color tokens to semantic roles (primary, surface, text, etc.) for both light and dark modes.
- **Unified Configuration:** Both the PrimeNG preset and the application's configuration service must consume the same shared tokens.
- **CSS Variable Sync:** Ensure global CSS files (`styles.css`, `app.css`) are checked for hardcoded values that should be replaced by the new tokens or CSS variables.
- **Storage Reset:** Perform a one-time reset of `localStorage` theme settings to ensure compatibility with the new refactored structure and values.

## Technical Requirements
- **Directory Structure:** Constants will be located in `src/app/features/color-config/constants/`.
- **Files to Create:**
  - `color-tokens.ts`: Primitive color palette (e.g., SLATE, SKY, ORANGE).
  - `semantic-colors.ts`: Light and dark mode mappings and `DEFAULT_COLOR_CONFIG`.
  - `theme.types.ts`: TypeScript interfaces for the color system.
  - `index.ts`: Barrel export for the constants directory.
- **Files to Refactor:**
  - `src/app/app.config.ts`: Replace hardcoded values in the PrimeNG theme preset.
  - `src/app/features/color-config/services/color-config.service.ts`: Replace `DEFAULT_CONFIG` with the shared version and implement the `localStorage` reset logic.
  - `src/styles.css` / `src/app/app.css`: Audit and update as necessary.

## Acceptance Criteria
- No duplicate hex color values exist between `app.config.ts` and `color-config.service.ts`.
- The application correctly initializes with the new `DEFAULT_COLOR_CONFIG`.
- PrimeNG components correctly reflect the theme defined by the shared tokens.
- Light and dark mode switching remains functional and uses the centralized tokens.
- `localStorage` is successfully reset (one-time) upon first load after the update.

## Out of Scope
- Adding new colors beyond those defined in the current plan.
- Implementing new UI components for color management (this refactors existing ones).
