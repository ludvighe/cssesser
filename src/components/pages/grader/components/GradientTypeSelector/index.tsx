import { Accessor, For } from "solid-js";
import { ColorState, Gradient } from "../../types";
import "./index.scss";

export default ({
  gradient,
  onChange,
}: {
  gradient: Accessor<Gradient>;
  onChange: (gradient: Gradient) => void;
}) => {
  const types = [
    "linear-gradient",
    "radial-gradient",
    "conic-gradient",
    "repeating-linear-gradient",
    "repeating-radial-gradient",
  ];
  const getActiveID = (type: string) => {
    const isActive = gradient().type === type;
    return isActive ? " current-link" : "";
  };
  return (
    <div class="gradient-type-selector">
      <For each={types}>
        {(type) => (
          <span
            class={"gradient-type-option page-link" + getActiveID(type)}
            onClick={() =>
              onChange({ ...gradient(), type: type as Gradient["type"] })
            }
          >
            {type.slice(0, -9)}
          </span>
        )}
      </For>
    </div>
  );
};
