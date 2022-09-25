import { Accessor } from "solid-js";
import { w3color, W3Color } from "../../../services/w3color";

/** Modifies lightness or darkness of given w3color and returns result. */
export const modifyColor = (
  color: W3Color,
  field: "lightness" | "saturation",
  value: number
) => {
  const clr = color;
  if (field === "lightness") {
    if (value < 0) {
      clr.darker(-value);
    } else {
      clr.lighter(value);
    }
  } else if (field === "saturation") {
    if (value < 0) {
      clr.desaturate(-value);
    } else {
      clr.saturate(value);
    }
  }
  return w3color(clr.toHexString());
};

/** Calls stringed function of given w3color if exists. */
export const colorString = (color: Accessor<W3Color>, fn: string) => {
  const clr = color() as any;
  if (typeof clr[fn] === "function") {
    return clr[fn]();
  }
  return "";
};

export const colorConfig = [
  {
    name: "Name",
    toString: (color: Accessor<W3Color>) => colorString(color, "toName"),
    about: {
      title: "Name",
      acronym: "Name",
      description: <p>Named colors such as red, green, and blue.</p>,
      resource: "https://developer.mozilla.org/en-US/docs/Web/CSS/named-color",
    },
  },
  {
    name: "RGB",
    toString: (color: Accessor<W3Color>) => colorString(color, "toRgbString"),
    about: {
      title: "Red, Green, Blue",
      acronym: "RGB",
      description: (
        <p>
          Determines color based on the numerical values (0 - 255) of red, green
          and blue.
        </p>
      ),
      resource:
        "https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/rgb",
    },
  },
  {
    name: "RGB A",
    toString: (color: Accessor<W3Color>) => colorString(color, "toRgbaString"),
    about: {
      title: "Red, Green, Blue, and Alpha",
      acronym: "RGB A",
      description: (
        <>
          <p>
            Determines color based on the numerical values (0-255) of red, green
            and blue.
          </p>
          <p>
            This also includes an alpha value which is a decimal number from 0
            to 1 where 0 means transparent and 1 means opaque.
          </p>
        </>
      ),
      resource:
        "https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/rgba",
    },
  },
  {
    name: "Hex",
    toString: (color: Accessor<W3Color>) => colorString(color, "toHexString"),
    about: {
      title: "Hexadecimal",
      acronym: "Hex",
      description: (
        <>
          <p>
            A grouped hexadecimal (0 - F) representation of a color divised of a
            red (R), green (G), blue (B), and an optional alpha (A) channel.
          </p>
          <p>Can be written in 4 ways:</p>
          <ul>
            <li>#RGB</li>
            <li>#RGBA</li>
            <li>#RRGGBB</li>
            <li>#RRGGBBAA</li>
          </ul>
        </>
      ),
      resource: "https://developer.mozilla.org/en-US/docs/Web/CSS/hex-color",
    },
  },
  {
    name: "HSL",
    toString: (color: Accessor<W3Color>) => colorString(color, "toHslString"),
    about: {
      title: "Hue, Saturation, Lightness",
      acronym: "HSL",
      description: (
        <>
          <p>
            Determines color based on the rotation of the hue (0° - 359°), and
            the percentual value of saturation and lightness.
          </p>
          <p>
            <strong>Hue</strong> is an angle on a color wheel, where 0° is red,
            120° is green, 240° is blue.
          </p>
          <div
            style={{
              width: "100px",
              height: "100px",
              "border-radius": "100%",
              background:
                "conic-gradient(red, green 120deg, blue 240deg, red 359deg)",
            }}
          />
          <p>
            <strong>Saturation</strong> determines how much of the full color
            should be displayed, where 0% means a shade of gray and 100% means
            the true color without modification.
          </p>
          <p>
            <strong>Lightness</strong> determines how bright the color should
            be, where 0% is black, 50% is the true color, and 100% is white.
          </p>
        </>
      ),
      resource:
        "https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl",
    },
  },
  {
    name: "HWB",
    toString: (color: Accessor<W3Color>) => colorString(color, "toHwbString"),
    about: {
      title: "Hue, Whiteness, Blackness",
      acronym: "HWB",
      description: (
        <>
          <p>
            Determines color based on the rotation of the hue (0° - 359°), and
            the percentual value of whiteness and blackness.
          </p>
          <p>
            <strong>Hue</strong> is an angle on a color wheel, where 0° is red,
            120° is green, 240° is blue.
          </p>
          <div
            style={{
              width: "100px",
              height: "100px",
              "border-radius": "100%",
              background:
                "conic-gradient(red, green 120deg, blue 240deg, red 359deg)",
            }}
          />
          <p>
            <strong>Whiteness</strong> determines the amount of white to mix in,
            where 0% is none and 100% is completely white.
          </p>
          <p>
            <strong>Blackness</strong> determines how much black to mix in,
            where 0% is none and 100% is completely black.
          </p>
          <p>
            <i>
              NOTE: First introduced in CSS4, support might vary between
              browsers.
            </i>
          </p>
        </>
      ),
      resource:
        "https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hwb",
    },
  },
  {
    name: "CMYK",
    toString: (color: Accessor<W3Color>) => colorString(color, "toCmykString"),
    about: {
      title: "Cyan, Magenta, Yellow, and Black",
      acronym: "CMYK",
      description: (
        <p>
          Determines color based on the percentual (0% - 100%) values of cyan,
          magenta, yellow and black.
        </p>
      ),
      resource: "https://www.w3schools.com/colors/colors_cmyk.asp",
    },
  },
  {
    name: "NCol",
    toString: (color: Accessor<W3Color>) => colorString(color, "toNcolString"),
    about: {
      title: "Natural Colors",
      acronym: "NCol",
      description: (
        <>
          <p>
            Determines colos based on a "natural color" with a percentage
            attached to it, a percentual value of whiteness, and a percentual
            value of blackness.
          </p>
          <p>
            <strong>Natural color</strong> is a letter representation of one of
            the colors (in order) red (R), yellow (Y), green (G), cyan (C), blue
            (B), and magenta (M). The percentual value (0 - 99) is the distance
            on a color strip to the next color.
          </p>
          <div
            style={{
              width: "100%",
              height: "10px",
              background:
                "linear-gradient(90deg, red, yellow, green, cyan, blue, magenta, red)",
            }}
          />
          <p>
            <strong>Whiteness</strong> determines the amount of white to mix in,
            where 0% is none and 100% is completely white.
          </p>
          <p>
            <strong>Blackness</strong> determines how much black to mix in,
            where 0% is none and 100% is completely black.
          </p>
          <p>
            <i>
              NOTE: Is an initiative from W3Schools, support is not guaranteed.
            </i>
          </p>
        </>
      ),
      resource: "https://www.w3schools.com/colors/colors_ncol.asp",
    },
  },
];
