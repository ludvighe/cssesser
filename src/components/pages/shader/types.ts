export type Shadow = {
  id: string;

  /** The color of the shadow. The default value is the text color. Look at CSS Color Values for a complete list of possible color values. */
  color: string;

  /** The horizontal offset of the shadow. A positive value puts the shadow on the right side of the box, a negative value puts the shadow on the left side of the box. */
  horizontalOffset: number;
  /** The vertical offset of the shadow. A positive value puts the shadow below the box, a negative value puts the shadow above the box. */
  verticalOffset: number;

  /** The blur radius. The higher the number, the more blurred the shadow will be. */
  blurRadius: number;
  /** The spread radius. A positive value increases the size of the shadow, a negative value decreases the size of the shadow. */
  spread: number;

  /** Changes the shadow from an outer shadow (outset) to an inner shadow */
  inset: boolean;
};

export interface BoxShadow {
  backgroundColor: string;
  foregroundColor: string;
  shadows: Shadow[];
}
