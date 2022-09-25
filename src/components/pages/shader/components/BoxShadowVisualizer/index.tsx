import { Accessor, Setter } from "solid-js";
import { BoxShadow } from "../../types";
import { shadowsToString } from "../../utils";
import "./index.scss";

export default ({
  boxShadow,
  setBoxShadow,
}: {
  boxShadow: Accessor<BoxShadow>;
  setBoxShadow: Setter<BoxShadow>;
}) => {
  return (
    <div class="bs-container">
      <input
        type="color"
        id="bs-bg-picker"
        value={boxShadow().backgroundColor}
        onInput={(e: any) =>
          setBoxShadow((prev) => ({
            ...prev,
            backgroundColor: e.target.value,
          }))
        }
      />
      <label style={{ color: boxShadow().backgroundColor }}>
        background-color: {boxShadow().backgroundColor};
      </label>
      <div
        id="bs"
        style={{
          "box-shadow": shadowsToString(boxShadow().shadows),
          "background-color": boxShadow().foregroundColor,
        }}
      >
        <input
          type="color"
          id="bs-fg-picker"
          onInput={(e: any) =>
            setBoxShadow((prev) => ({
              ...prev,
              foregroundColor: e.target.value,
            }))
          }
        />
        <label style={{ color: boxShadow().foregroundColor }}>
          background-color: {boxShadow().foregroundColor};
        </label>
      </div>
    </div>
  );
};
