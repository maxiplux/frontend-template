import '@angular/compiler';
import { CustomPreset } from './app.config';
import { SLATE, SKY, ORANGE } from './features/color-config/constants';

describe('AppConfig', () => {
  it('should use shared SLATE tokens in PrimeNG preset', () => {
    // Accessing primitive colors from the preset
    const primitive = (CustomPreset as any).primitive;
    expect(primitive.slate[50]).toBe(SLATE[50]);
    expect(primitive.slate[900]).toBe(SLATE[900]);
  });

  it('should use shared SKY tokens in PrimeNG preset', () => {
    const primitive = (CustomPreset as any).primitive;
    expect(primitive.sky[500]).toBe(SKY[500]);
  });

  it('should use shared ORANGE tokens in PrimeNG preset', () => {
    const primitive = (CustomPreset as any).primitive;
    expect(primitive.orange[500]).toBe(ORANGE[500]);
  });
});
