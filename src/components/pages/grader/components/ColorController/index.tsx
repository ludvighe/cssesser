import { Accessor, createSignal } from "solid-js";
import { ColorState } from "../../types";
import "./index.scss";
export default ({
  state,
  onChange,
}: {
  state: Accessor<ColorState>;
  onChange: (state: ColorState) => void;
}) => {
  const [shouldDispose, setShouldDispose] = createSignal(false);
  const handleOnRemove = () => {
    setShouldDispose(true);
    setTimeout(() => {
      onChange({ ...state(), placement: -1 });
    }, 200);
  };
  return (
    <div
      class={
        "color-controller" +
        (shouldDispose() ? " color-controller-dispose" : "")
      }
    >
      <div class="input-color" style={{ "background-color": state().color }}>
        <input
          type="color"
          value={state().color}
          onInput={(e: any) => onChange({ ...state(), color: e.target.value })}
        />
      </div>
      <div class="field">
        <label>Color (any css color)</label>
        <input
          type="text"
          value={state().color}
          onInput={(e: any) => {
            onChange({ ...state(), color: e.target.value });
          }}
        />
      </div>
      <div class="field">
        <label>Position (%)</label>
        <input
          style={{ "max-width": "60px" }}
          type="number"
          min="0"
          max="100"
          value={state().position}
          onInput={(e: any) =>
            onChange({ ...state(), position: e.target.value })
          }
        />
        <input
          type="range"
          min="0"
          max="100"
          value={state().position}
          onInput={(e: any) =>
            onChange({ ...state(), position: e.target.value })
          }
        />
      </div>
      <button onClick={handleOnRemove}>Remove</button>
    </div>
  );
};
