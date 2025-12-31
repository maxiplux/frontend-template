import {
  inject,
  Injectable,
  signal,
  PLATFORM_ID,
  effect,
  DestroyRef,
  computed,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

/** Valid theme types */
export type Theme = 'light' | 'dark';

/** Key used for localStorage preference */
const STORAGE_KEY = 'app-theme-preference';

/**
 * Service to manage the application's color theme (light/dark).
 * Synchronizes with system preferences and persists user choice in localStorage.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly destroyRef = inject(DestroyRef);

  /**
   * The current theme state as a signal.
   */
  readonly theme = signal<Theme>(this.getInitialTheme());

  /**
   * Computed signal that indicates if the dark theme is currently active.
   */
  readonly isDark = computed(() => this.theme() === 'dark');

  constructor() {
    // Sync theme changes to DOM and localStorage
    effect(() => {
      const currentTheme = this.theme();
      this.applyTheme(currentTheme);
      this.savePreference(currentTheme);
    });

    // Listen for system preference changes
    if (this.isBrowser) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        if (!this.getSavedPreference()) {
          this.theme.set(e.matches ? 'dark' : 'light');
        }
      };

      mediaQuery.addEventListener('change', handleChange);

      // Clean up event listener on service destruction
      this.destroyRef.onDestroy(() => {
        mediaQuery.removeEventListener('change', handleChange);
      });
    }
  }

  /**
   * Toggles the theme between 'light' and 'dark'.
   */
  toggleTheme(): void {
    this.theme.update((current) => (current === 'dark' ? 'light' : 'dark'));
  }

  /**
   * Sets the theme to a specific value.
   * @param theme The theme to set ('light' or 'dark').
   */
  setTheme(theme: Theme): void {
    this.theme.set(theme);
  }

  /**
   * Determines the initial theme based on saved preferences or system settings.
   * @returns The initial theme.
   */
  private getInitialTheme(): Theme {
    if (!this.isBrowser) {
      return 'light';
    }

    // Check saved preference first
    const saved = this.getSavedPreference();
    if (saved) {
      return saved;
    }

    // Fall back to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  /**
   * Retrieves the saved theme preference from localStorage.
   * @returns The saved theme or null if not set.
   */
  private getSavedPreference(): Theme | null {
    if (!this.isBrowser || typeof localStorage === 'undefined') {
      return null;
    }
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'dark' || saved === 'light' ? saved : null;
  }

  /**
   * Saves the theme preference to localStorage.
   * @param theme The theme to save.
   */
  private savePreference(theme: Theme): void {
    if (this.isBrowser && typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, theme);
    }
  }

  /**
   * Applies the theme class to the document's root element.
   * @param theme The theme to apply.
   */
  private applyTheme(theme: Theme): void {
    const htmlElement = this.document.documentElement;
    if (theme === 'dark') {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }
}
