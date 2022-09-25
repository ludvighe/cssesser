import { Accessor } from "solid-js";
import { Shadow } from "../../types";
import "./index.scss";

export default ({
  shadow,
  onChange,
}: {
  shadow: Accessor<Shadow>;
  onChange: (shadow: Shadow) => void;
}) => {
  const handleOnChange = (
    type:
      | "color"
      | "horizontalOffset"
      | "verticalOffset"
      | "inset"
      | "blurRadius"
      | "spread"
      | "reset",
    value?: any
  ) => {
    if (type === "reset") {
      onChange({
        ...shadow(),
        color: "#000000aa",
        horizontalOffset: 0,
        verticalOffset: 5,
        blurRadius: 15,
        inset: false,
        spread: 0,
      });
    } else {
      onChange({ ...shadow(), [type]: value });
    }
  };

  return (
    <div class="shadow-controller">
      <div class="shadow-color field">
        <label for="shadow-color-input">Color (any css color)</label>
        <input
          type="color"
          // value={shadow().color}
          style={{ "background-color": shadow().color }}
          onInput={(e: any) => handleOnChange("color", e.target.value)}
        />
        <input
          type="text"
          value={shadow().color}
          onInput={(e: any) => handleOnChange("color", e.target.value)}
        />
      </div>
      <div class="shadow-h-offset field">
        <label for="shadow-h-offset-input">Horizontal offset</label>
        <input
          id="shadow-h-offset-input"
          type="number"
          value={shadow().horizontalOffset}
          onInput={(e: any) =>
            handleOnChange("horizontalOffset", parseInt(e.target.value))
          }
        />
      </div>
      <div class="shadow-v-offset field">
        <label for="shadow-v-offset-input">Vertical offset</label>
        <input
          id="shadow-v-offset-input"
          type="number"
          value={shadow().verticalOffset}
          onInput={(e: any) =>
            handleOnChange("verticalOffset", parseInt(e.target.value))
          }
        />
      </div>
      <div class="shadow-inset field">
        <button
          id="shadow-inset-input"
          style={{
            "background-color": shadow().inset
              ? "var(--clr-primary)"
              : "transparent",
          }}
          onClick={() => handleOnChange("inset", !shadow().inset)}
        >
          Inset
        </button>
      </div>
      <div class="shadow-blur field">
        <label for="shadow-blur-input">Blur radius</label>
        <input
          id="shadow-blur-input"
          type="number"
          min={"0"}
          value={shadow().blurRadius}
          onInput={(e: any) =>
            handleOnChange("blurRadius", parseInt(e.target.value))
          }
        />
      </div>
      <div class="shadow-spread field">
        <label for="shadow-spread-input">Spread radius</label>
        <input
          id="shadow-spread-input"
          type="number"
          value={shadow().spread}
          onInput={(e: any) =>
            handleOnChange("spread", parseInt(e.target.value))
          }
        />
      </div>
      <button onClick={() => handleOnChange("reset")}>Reset</button>
    </div>
  );
};
