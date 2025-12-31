import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface ColorPalette {
  primary: string;
  surface: string;
  text: string;
  muted: string;
  border: string;
}

export interface ColorConfig {
  light: ColorPalette;
  dark: ColorPalette;
}

const DEFAULT_CONFIG: ColorConfig = {
  light: {
    primary: '#0ea5e9', // --accent
    surface: '#f8fafc', // --bg
    text: '#0f172a',    // --text
    muted: '#64748b',   // --muted
    border: '#e2e8f0',  // --border
  },
  dark: {
    primary: '#38bdf8', // --accent
    surface: '#0f172a', // --bg
    text: '#f8fafc',    // --text
    muted: '#94a3b8',   // --muted
    border: '#334155',  // --border
  },
};

const STORAGE_KEY = 'color-config';

@Injectable({ providedIn: 'root' })
export class ColorConfigService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly config = signal<ColorConfig>(this.getInitialConfig());

  constructor() {
    effect(() => {
      this.saveConfig(this.config());
    });
  }

  updateColor(mode: 'light' | 'dark', type: keyof ColorPalette, value: string): void {
    this.config.update((current) => ({
      ...current,
      [mode]: {
        ...current[mode],
        [type]: value,
      },
    }));
  }

  resetToDefaults(): void {
    this.config.set(DEFAULT_CONFIG);
  }

  getDefaultConfig(): ColorConfig {
    return DEFAULT_CONFIG;
  }

  exportConfig(): Blob {
    const config = this.config();
    const json = JSON.stringify(config, null, 2);
    return new Blob([json], { type: 'application/json' });
  }

  private getInitialConfig(): ColorConfig {
    if (!this.isBrowser) {
      return DEFAULT_CONFIG;
    }

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse color config from localStorage', e);
        return DEFAULT_CONFIG;
      }
    }
    return DEFAULT_CONFIG;
  }

  private saveConfig(config: ColorConfig): void {
    if (this.isBrowser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    }
  }
}
