import { createSignal, Index, onMount } from "solid-js";
import { randomHexColor } from "../../../services/color.service";
import "./index.scss";

type Color = {
  id: number;
  color: string;
};

const localStorageKey = "vis-colors";

export default ({}: {}) => {
  const [colors, setColors] = createSignal<Color[]>([]);
  const [show, setShow] = createSignal(false);

  onMount(() => {
    const stored = window.localStorage.getItem(localStorageKey);
    if (stored) {
      try {
        setColors(JSON.parse(stored));
      } catch (e) {}
    }
  });

  const saveColors = () => {
    window.localStorage.setItem(localStorageKey, JSON.stringify(colors()));
  };

  const handleOnCreateColor = () => {
    let id = 0;
    if (colors().length !== 0) id = Math.max(...colors().map((c) => c.id)) + 1;
    setColors([...colors(), { id, color: randomHexColor() }]);
    saveColors();
  };

  const handleOnUpdateColor = (color: Color) => {
    setColors(colors().map((c) => (c.id === color.id ? color : c)));
    saveColors();
  };

  const handleOnRemoveColor = (color: Color) => {
    setColors([...colors().filter((c) => c.id !== color.id)]);
    saveColors();
  };
  return (
    <div
      class={"my-colors" + (show() ? " __show" : " __hide")}
      // onMouseLeave={() => setShow(false)}
    >
      <div class="tag" onClick={() => setShow(!show())}>
        Colors
      </div>
      <div class="colors-list">
        {colors().length === 0 && <h2>No saved colors</h2>}
        <Index each={colors()}>
          {(color) => (
            <div class="color-container">
              <div style={{ "background-color": color().color, width: "30px" }}>
                <input
                  type="color"
                  value={color().color}
                  onInput={(e: any) =>
                    handleOnUpdateColor({ ...color(), color: e.target.value })
                  }
                />
              </div>
              <input
                type="text"
                value={color().color}
                onInput={(e: any) =>
                  handleOnUpdateColor({ ...color(), color: e.target.value })
                }
              />
              <button
                onClick={() => navigator.clipboard.writeText(color().color)}
              >
                Copy
              </button>
              <button
                onClick={() => handleOnRemoveColor(color())}
                style={{ "background-color": "var(--clr-error)" }}
              >
                Remove
              </button>
            </div>
          )}
        </Index>
      </div>

      <button onClick={handleOnCreateColor}>Add new color</button>
    </div>
  );
};
