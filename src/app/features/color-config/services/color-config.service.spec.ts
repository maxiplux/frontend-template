import { TestBed } from '@angular/core/testing';
import { ColorConfigService, ColorConfig } from './color-config.service';

describe('ColorConfigService', () => {
  let service: ColorConfigService;

  beforeEach(() => {
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
});
