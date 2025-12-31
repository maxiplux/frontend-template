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
    
    // Also update PrimeNG primary color if possible, 
    // though our styles.css seems to use these custom variables.
  }
}
