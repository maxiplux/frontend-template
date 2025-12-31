import { Injectable, signal } from '@angular/core';

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

@Injectable({ providedIn: 'root' })
export class ColorConfigService {
  readonly config = signal<ColorConfig>(DEFAULT_CONFIG);

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
}
