import { DEFAULT_COLOR_CONFIG } from './semantic-colors';
import { SLATE, SKY } from './color-tokens';

describe('SemanticColors', () => {
  it('should have DEFAULT_COLOR_CONFIG defined', () => {
    expect(DEFAULT_COLOR_CONFIG).toBeDefined();
  });

  it('should map light mode colors correctly', () => {
    const light = DEFAULT_COLOR_CONFIG.light;
    expect(light.primary).toBe(SKY[500]);
    expect(light.surface).toBe(SLATE[50]);
    expect(light.text).toBe(SLATE[900]);
    expect(light.muted).toBe(SLATE[500]);
    expect(light.border).toBe(SLATE[200]);
  });

  it('should map dark mode colors correctly', () => {
    const dark = DEFAULT_COLOR_CONFIG.dark;
    expect(dark.primary).toBe(SKY[400]);
    expect(dark.surface).toBe(SLATE[900]);
    expect(dark.text).toBe(SLATE[50]);
    expect(dark.muted).toBe(SLATE[400]);
    expect(dark.border).toBe(SLATE[700]);
  });
});
