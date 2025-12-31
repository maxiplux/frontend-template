import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface ColorPalette {
  primary: string;
  surface: string;
}

export interface ColorConfig {
  light: ColorPalette;
  dark: ColorPalette;
}

const DEFAULT_CONFIG: ColorConfig = {
  light: {
    primary: '#3B82F6', // Blue-500
    surface: '#FFFFFF', // White
  },
  dark: {
    primary: '#60A5FA', // Blue-400
    surface: '#1F2937', // Gray-800
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
