import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';
import { DOCUMENT } from '@angular/common';

describe('ThemeService', () => {
  let service: ThemeService;
  let document: Document;
  let store: Record<string, string> = {};

  beforeEach(() => {
    store = {};
    
    // Mock localStorage
    const mockLocalStorage = {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => { store[key] = value; },
      clear: () => { store = {}; },
      removeItem: (key: string) => { delete store[key]; },
      length: 0,
      key: (index: number) => null,
    };
    
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true
    });

    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {}, // Deprecated
        removeListener: () => {}, // Deprecated
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => {},
      }),
    });

    TestBed.configureTestingModule({
      providers: [ThemeService],
    });
    service = TestBed.inject(ThemeService);
    document = TestBed.inject(DOCUMENT);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have an initial theme', () => {
    expect(service.theme()).toBeDefined();
  });

  it('should toggle theme', () => {
    const initialTheme = service.theme();
    service.toggleTheme();
    const newTheme = service.theme();
    expect(newTheme).not.toBe(initialTheme);
    service.toggleTheme();
    expect(service.theme()).toBe(initialTheme);
  });

  it('should set theme', () => {
    service.setTheme('dark');
    expect(service.theme()).toBe('dark');
    service.setTheme('light');
    expect(service.theme()).toBe('light');
  });

  it('should provide isDark as a computed signal', () => {
    service.setTheme('dark');
    expect(service.isDark()).toBe(true);
    service.setTheme('light');
    expect(service.isDark()).toBe(false);
  });

  it('should apply dark class to html element', async () => {
    service.setTheme('dark');
    // We need to wait for the effect to run
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    service.setTheme('light');
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
