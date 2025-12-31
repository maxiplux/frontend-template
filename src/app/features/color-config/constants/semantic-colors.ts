import { SLATE, SKY } from './color-tokens';
import { ColorConfig } from './theme.types';

export const DEFAULT_COLOR_CONFIG: ColorConfig = {
  light: {
    primary: SKY[500],
    surface: SLATE[50],
    text: SLATE[900],
    muted: SLATE[500],
    border: SLATE[200],
  },
  dark: {
    primary: SKY[400],
    surface: SLATE[900],
    text: SLATE[50],
    muted: SLATE[400],
    border: SLATE[700],
  },
};
