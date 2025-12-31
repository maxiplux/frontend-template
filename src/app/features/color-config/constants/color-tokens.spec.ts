import { SLATE, SKY, ORANGE } from './color-tokens';

describe('ColorTokens', () => {
  it('should have SLATE palette defined', () => {
    expect(SLATE).toBeDefined();
    expect(SLATE[500]).toBe('#64748b');
    expect(SLATE[50]).toBe('#f8fafc');
    expect(SLATE[900]).toBe('#0f172a');
  });

  it('should have SKY palette defined', () => {
    expect(SKY).toBeDefined();
    expect(SKY[500]).toBe('#0ea5e9');
    expect(SKY[400]).toBe('#38bdf8');
  });

  it('should have ORANGE palette defined', () => {
    expect(ORANGE).toBeDefined();
    expect(ORANGE[500]).toBe('#f97316');
  });
});
