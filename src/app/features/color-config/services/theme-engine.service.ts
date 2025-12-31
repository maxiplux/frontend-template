import { Injectable, inject, effect, PLATFORM_ID } from '@angular/core';
import { ColorConfigService, ColorPalette } from './color-config.service';
import { ThemeService } from '../../../core/services/theme.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeEngineService {
  private readonly colorConfig = inject(ColorConfigService);
  private readonly themeService = inject(ThemeService);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  constructor() {
    effect(() => {
      const config = this.colorConfig.config();
      const isDark = this.themeService.isDark();
      const palette = isDark ? config.dark : config.light;

      this.applyPalette(palette);
    });
  }

  private applyPalette(palette: ColorPalette): void {
    if (!this.isBrowser) {
      return;
    }

    const root = this.document.documentElement;
    root.style.setProperty('--accent', palette.primary);
    root.style.setProperty('--bg', palette.surface);
    root.style.setProperty('--text', palette.text);
    root.style.setProperty('--muted', palette.muted);
    root.style.setProperty('--border', palette.border);
    
    this.updatePrimeNGPrimary(palette.primary);
  }

  private updatePrimeNGPrimary(hex: string): void {
    const shades = this.generatePalette(hex);
    const root = this.document.documentElement;

    Object.keys(shades).forEach((key) => {
      root.style.setProperty(`--p-primary-${key}`, shades[key]);
    });
    
    // Also set the main primary variables often used by PrimeNG
    root.style.setProperty('--p-primary-color', hex);
  }

  private generatePalette(hex: string): { [key: string]: string } {
    // Simple palette generation logic (placeholder)
    // In a real app, this should use a proper color manipulation library or algorithm
    // For now, we'll just set everything to the picked color or simple variations
    // to prove the concept. A full implementation would require HSL conversion.
    
    // Ideally, we should use something like tinycolor2 or chroma-js, but we want to avoid deps.
    // Let's assume the user picks the '500' shade.
    
    return {
      '50': this.adjustBrightness(hex, 0.9),
      '100': this.adjustBrightness(hex, 0.8),
      '200': this.adjustBrightness(hex, 0.6),
      '300': this.adjustBrightness(hex, 0.4),
      '400': this.adjustBrightness(hex, 0.2),
      '500': hex,
      '600': this.adjustBrightness(hex, -0.1),
      '700': this.adjustBrightness(hex, -0.2),
      '800': this.adjustBrightness(hex, -0.3),
      '900': this.adjustBrightness(hex, -0.4),
      '950': this.adjustBrightness(hex, -0.5),
    };
  }

  private adjustBrightness(hex: string, percent: number): string {
    // Strip the hash if it's there
    hex = hex.replace(/^\s*#|\s*$/g, '');

    // Convert 3-char codes to 6-char codes
    if (hex.length === 3) {
      hex = hex.replace(/(.)/g, '$1$1');
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const adjust = (val: number) => {
        let adjusted = val + Math.round(255 * percent);
        // If percent is negative, we darken (move towards 0)
        // If percent is positive, we lighten (move towards 255)
        
        // Better logic: blend with white (positive) or black (negative)
        if (percent > 0) {
             adjusted = val + (255 - val) * percent;
        } else {
             adjusted = val * (1 + percent);
        }
        
        return Math.min(255, Math.max(0, Math.round(adjusted)));
    };

    const rr = adjust(r).toString(16).padStart(2, '0');
    const gg = adjust(g).toString(16).padStart(2, '0');
    const bb = adjust(b).toString(16).padStart(2, '0');

    return `#${rr}${gg}${bb}`;
  }
}
