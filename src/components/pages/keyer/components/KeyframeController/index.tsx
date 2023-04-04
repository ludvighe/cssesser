import { Accessor, createSignal } from "solid-js";
import { Keyframe } from "../../types";
import { KeyframeTimeline } from "../KeyframeTimeline";
import "./index.scss";

export const KeyframeController = ({
  keyframe,
  onChange,
}: {
  keyframe: Accessor<Keyframe>;
  onChange: (keyframe: Keyframe) => void;
}) => {
  const [error, setError] = createSignal({ name: false });
  const handleOnChange = (keyframe: Keyframe) => {
    let includesErrors = false;

    // Validate name
    if (!/^[a-zA-Z][a-zA-Z0-9-]*$/.test(keyframe.name)) {
      setError((prev) => ({ ...prev, name: true }));
      includesErrors = true;
    } else {
      setError((prev) => ({ ...prev, name: false }));
    }

    if (!includesErrors) onChange(keyframe);
  };
  return (
    <div class="keyframe-controller">
      <div class="input-field">
        <label>Name</label>
        <input
          title="Must conform with CSS naming convention.\nEg: a-c00l-animation\n\n• Must start with an alphabetical character\n• Must only contain alphanumerical and hyphen characters\n\n• regexp: /^[a-zA-Z][a-zA-Z0-9-]*$/"
          type="text"
          placeholder="animation name"
          class={error().name ? "input-error" : ""}
          onInput={(e: any) =>
            handleOnChange({ ...keyframe(), name: e.target.value })
          }
        />
      </div>
    </div>
  );
};
