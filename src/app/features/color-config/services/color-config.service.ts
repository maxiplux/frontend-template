import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ColorConfig, ColorPalette, DEFAULT_COLOR_CONFIG } from '../constants';

export type { ColorConfig, ColorPalette }; // Re-export for compatibility

const STORAGE_KEY = 'color-config';
const VERSION_KEY = 'color-config-version';
const CURRENT_VERSION = '2.0.0'; // Incrementing version for refactor reset

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
    this.config.set(DEFAULT_COLOR_CONFIG);
  }

  getDefaultConfig(): ColorConfig {
    return DEFAULT_COLOR_CONFIG;
  }

  exportConfig(): Blob {
    const config = this.config();
    const json = JSON.stringify(config, null, 2);
    return new Blob([json], { type: 'application/json' });
  }

  async importConfig(file: File): Promise<boolean> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target?.result as string;
          const config = JSON.parse(text);
          if (this.isValidConfig(config)) {
            this.config.set(config);
            resolve(true);
          } else {
            resolve(false);
          }
        } catch (e) {
          console.error('Failed to import color config', e);
          resolve(false);
        }
      };
      reader.onerror = () => resolve(false);
      reader.readAsText(file);
    });
  }

  private isValidConfig(config: any): config is ColorConfig {
    if (!config || typeof config !== 'object') return false;
    if (!config.light || !config.dark) return false;
    
    const validatePalette = (palette: any) => {
      return (
        palette &&
        typeof palette.primary === 'string' &&
        typeof palette.surface === 'string' &&
        typeof palette.text === 'string' &&
        typeof palette.muted === 'string' &&
        typeof palette.border === 'string'
      );
    };

    return validatePalette(config.light) && validatePalette(config.dark);
  }

  private getInitialConfig(): ColorConfig {
    if (!this.isBrowser) {
      return DEFAULT_COLOR_CONFIG;
    }

    // Check version for one-time reset
    const savedVersion = localStorage.getItem(VERSION_KEY);
    if (savedVersion !== CURRENT_VERSION) {
      localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
      // If version mismatch, we force a reset to new defaults once
      return DEFAULT_COLOR_CONFIG;
    }

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return this.isValidConfig(parsed) ? parsed : DEFAULT_COLOR_CONFIG;
      } catch (e) {
        console.error('Failed to parse color config from localStorage', e);
        return DEFAULT_COLOR_CONFIG;
      }
    }
    return DEFAULT_COLOR_CONFIG;
  }

  private saveConfig(config: ColorConfig): void {
    if (this.isBrowser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    }
  }
}