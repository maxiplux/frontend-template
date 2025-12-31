import { TestBed } from '@angular/core/testing';
import { ThemeEngineService } from './theme-engine.service';
import { ColorConfigService } from './color-config.service';
import { ThemeService } from '../../../core/services/theme.service';
import { signal, computed } from '@angular/core';
import { DOCUMENT } from '@angular/common';

describe('ThemeEngineService', () => {
  let service: ThemeEngineService;
  let colorConfigServiceMock: any;
  let themeServiceMock: any;
  let document: Document;

  beforeEach(() => {
    colorConfigServiceMock = {
      config: signal({
        light: { primary: '#light-p', surface: '#light-s', text: '#light-t', muted: '#light-m', border: '#light-b' },
        dark: { primary: '#dark-p', surface: '#dark-s', text: '#dark-t', muted: '#dark-m', border: '#dark-b' }
      })
    };

    themeServiceMock = {
      isDark: signal(false)
    };

    TestBed.configureTestingModule({
      providers: [
        ThemeEngineService,
        { provide: ColorConfigService, useValue: colorConfigServiceMock },
        { provide: ThemeService, useValue: themeServiceMock }
      ]
    });

    service = TestBed.inject(ThemeEngineService);
    document = TestBed.inject(DOCUMENT);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should apply light theme variables when not dark mode', async () => {
    themeServiceMock.isDark.set(false);
    // Effects are async, we need to flush them or wait
    await new Promise(resolve => setTimeout(resolve, 0));

    const styles = document.documentElement.style;
    expect(styles.getPropertyValue('--accent')).toBe('#light-p');
    expect(styles.getPropertyValue('--bg')).toBe('#light-s');
    expect(styles.getPropertyValue('--text')).toBe('#light-t');
  });

  it('should apply dark theme variables when dark mode is active', async () => {
    themeServiceMock.isDark.set(true);
    await new Promise(resolve => setTimeout(resolve, 0));

    const styles = document.documentElement.style;
    expect(styles.getPropertyValue('--accent')).toBe('#dark-p');
    expect(styles.getPropertyValue('--bg')).toBe('#dark-s');
    expect(styles.getPropertyValue('--text')).toBe('#dark-t');
  });
});
