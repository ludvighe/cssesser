import { createSignal, For, lazy } from "solid-js";
import { W3Color, w3color } from "../../../services/w3color";
import "./index.scss";
import { colorConfig } from "./utils";
const About = lazy(() => import("./about"));

export default () => {
  const [color, setColor] = createSignal<W3Color>(w3color("magenta"));
  const [colorTxt, setColorTxt] = createSignal("");
  const handleOnInputText = (e: any) => {
    setColor(w3color(e.target.value));
    const input: any = document.getElementById("color-input-text");
    if (input) input.value = e.target.value;
    setColorTxt(e.target.value);
  };

  const handleOnInputColor = (e: any) => {
    setColor(w3color(e.target.value));
    const input: any = document.getElementById("color-input-text");
    if (input) input.value = e.target.value;
    setColorTxt(e.target.value);
  };

  return (
    <div class="converter-page">
      <section class="converter-color-input">
        <div class="color-input">
          <div
            class="color-input-text-label"
            style={{ opacity: colorTxt() === "" ? 1 : 0 }}
          >
            Enter a color (name, hex, rgb, hsl, hwb, cmyk, ncol)
          </div>

          <input
            onInput={handleOnInputText}
            type="text"
            value=""
            id="color-input-text"
          />
        </div>
        <div
          id="color-input-color"
          style={{ "background-color": color().toHexString() }}
        >
          <input
            type="color"
            value={color().toHexString()}
            onInput={handleOnInputColor}
          />
        </div>
      </section>

      <table class="converter-result">
        <tbody>
          <For each={colorConfig}>
            {(clr) => (
              <tr>
                <td class="td-name" title={clr.about?.title}>
                  {clr.name}
                </td>
                <td
                  class="td-value"
                  onClick={() =>
                    navigator.clipboard.writeText(clr.toString(color))
                  }
                >
                  {clr.toString(color)}
                </td>
                <td>
                  <About about={clr.about} />
                </td>
              </tr>
            )}
          </For>
        </tbody>
      </table>

      <a
        href="https://www.w3schools.com/colors/colors_converter.asp"
        target="_blank"
        rel="noopener noreferrer"
        class="learn-more-anchor"
      >
        Powered by w3color
      </a>
    </div>
  );
};
