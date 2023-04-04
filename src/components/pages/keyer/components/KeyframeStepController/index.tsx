import { Accessor, createSignal, createUniqueId, For } from "solid-js";
import { cssKeyframeProps } from "../../../../../services/css.services";
import PropInput from "../../../../common/PropInput";
import { KeyframeStep } from "../../types";
import "./index.scss";

export default ({
  keyframeStep,
  onClose,
  onDelete,
}: {
  keyframeStep: Accessor<KeyframeStep>;
  onClose: () => void;
  onDelete: () => void;
}) => {
  const [props, setProps] = createSignal([{ id: createUniqueId(), value: "" }]);

  const handleOnChange = (id: string, value: string) => {
    setProps((prev) => ({
      ...prev.map((p) => (p.id === id ? { id, value } : p)),
    }));
  };

  const handleOnCreateProp = () => {
    setProps((prev) => [...prev, { id: createUniqueId(), value: "" }]);
  };
  return (
    <div class="keyframe-step-controller">
      <header>
        <p>Keyframe step at {keyframeStep()?.percentage}%</p>
        <button style={{ "background-color": "firebrick" }} onClick={onDelete}>
          del
        </button>
        <button style={{ "background-color": "transparent" }} onClick={onClose}>
          X
        </button>
      </header>
      {/* <label>{keyframeStep()?.id}</label> */}
      <For each={props()}>
        {(prop) => (
          <PropInput onChange={(value) => handleOnChange(prop.id, value)} />
        )}
      </For>
      <button class="add-prop-btn" onClick={handleOnCreateProp}>
        + Add prop
      </button>
    </div>
  );
};
