export type ColorState = {
  id: string;
  placement: number; // In which order it should be displayed relative to other colors

  color: string;
  position: number;
};

export type Gradient = {
  type:
    | "linear-gradient"
    | "radial-gradient"
    | "conic-gradient"
    | "repeating-linear-gradient"
    | "repeating-radial-gradient";
  colors: ColorState[];
  rotation: number;
};
