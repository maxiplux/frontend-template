import { TestBed } from '@angular/core/testing';
import { ColorConfigService, ColorConfig } from './color-config.service';

describe('ColorConfigService', () => {
  let service: ColorConfigService;
  let store: Record<string, string> = {};

  beforeEach(() => {
    store = {};
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

    TestBed.configureTestingModule({
      providers: [ColorConfigService],
    });
    service = TestBed.inject(ColorConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with default config', () => {
    const config = service.config();
    expect(config).toBeTruthy();
    expect(config.light).toBeTruthy();
    expect(config.dark).toBeTruthy();
  });

  it('should update primary color for light mode', () => {
    const newColor = '#ff0000';
    service.updateColor('light', 'primary', newColor);
    expect(service.config().light.primary).toBe(newColor);
  });

  it('should update surface color for dark mode', () => {
    const newColor = '#000000';
    service.updateColor('dark', 'surface', newColor);
    expect(service.config().dark.surface).toBe(newColor);
  });

  it('should reset to defaults', () => {
    service.updateColor('light', 'primary', '#123456');
    service.resetToDefaults();
    const defaultConfig = service.getDefaultConfig();
    expect(service.config()).toEqual(defaultConfig);
  });

  it('should load config from localStorage on init', () => {
    const savedConfig: ColorConfig = {
      light: { primary: '#aabbcc', surface: '#ffffff', text: '#000000', muted: '#666666', border: '#dddddd' },
      dark: { primary: '#112233', surface: '#000000', text: '#ffffff', muted: '#999999', border: '#333333' }
    };
    store['color-config'] = JSON.stringify(savedConfig);
    
    // Re-inject service to trigger constructor
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ providers: [ColorConfigService] });
    const newService = TestBed.inject(ColorConfigService);
    
    expect(newService.config()).toEqual(savedConfig);
  });

  it('should save config to localStorage on update', () => {
    const newColor = '#123123';
    service.updateColor('light', 'primary', newColor);
    
    // We need to wait for the effect to run
    TestBed.flushEffects();
    
    const saved = JSON.parse(store['color-config']);
    expect(saved.light.primary).toBe(newColor);
  });

  it('should handle invalid JSON in localStorage', () => {
    store['color-config'] = 'invalid-json';
    
    // Re-inject service
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ providers: [ColorConfigService] });
    const newService = TestBed.inject(ColorConfigService);
    
    const defaultConfig = newService.getDefaultConfig();
    expect(newService.config()).toEqual(defaultConfig);
  });
});
