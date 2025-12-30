import { inject, Injectable, signal, PLATFORM_ID, effect, DestroyRef } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'app-theme-preference';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly destroyRef = inject(DestroyRef);

  /** Current theme state */
  readonly theme = signal<Theme>(this.getInitialTheme());

  /** Whether dark mode is currently active */
  readonly isDark = () => this.theme() === 'dark';

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

  /** Toggle between light and dark themes */
  toggleTheme(): void {
    this.theme.update((current) => (current === 'dark' ? 'light' : 'dark'));
  }

  /** Set a specific theme */
  setTheme(theme: Theme): void {
    this.theme.set(theme);
  }

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

  private getSavedPreference(): Theme | null {
    if (!this.isBrowser) {
      return null;
    }
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'dark' || saved === 'light' ? saved : null;
  }

  private savePreference(theme: Theme): void {
    if (this.isBrowser) {
      localStorage.setItem(STORAGE_KEY, theme);
    }
  }

  private applyTheme(theme: Theme): void {
    const htmlElement = this.document.documentElement;
    if (theme === 'dark') {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }
}
