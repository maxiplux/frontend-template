export interface ColorPalette {
  primary: string;
  surface: string;
  text: string;
  muted: string;
  border: string;
}

export interface ColorConfig {
  light: ColorPalette;
  dark: ColorPalette;
}

export type Palette = Record<number, string>;
