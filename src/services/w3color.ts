// TypeScript overlay for w3color.js fetched by index.html (https://www.w3schools.com/lib/w3color.js)

/** Interface for a color prototype returned by w3color(color: string) */
export interface W3Color {
  // Validators
  valid: boolean; // True if given color string is a valid html color else fale
  isDark: () => boolean;

  // Modifiers
  saturate: (n: number) => void;
  desaturate: (n: number) => void;
  lighter: (n: number) => void;
  darker: (n: number) => void;

  // String functions
  toName: () => string;

  toRgbString: () => string;
  toRgbaString: () => string;

  toHexString: () => string;

  toHslString: () => string;
  toHslaString: () => string;

  toHwbString: () => string;
  toHwbaString: () => string;

  toCmykString: () => string;
  toNcolString: () => string;

  // Obj functions
  toRgb: () => {
    r: number;
    g: number;
    b: number;
    a: number;
  };
  toHsl: () => {
    h: number;
    s: number;
    l: number;
    a: number;
  };
  toHwb: () => {
    h: number;
    w: number;
    b: number;
    a: number;
  };
  toCmyk: () => { c: number; m: number; y: number; k: number; a: number };
  toNcol: () => { ncol: string; w: number; b: number; a: number };
}

type w3color = (color: string) => W3Color;

export const w3color: w3color = (window as any).w3color;
