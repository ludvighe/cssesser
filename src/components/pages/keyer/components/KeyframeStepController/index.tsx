import { Accessor } from "solid-js";
import { KeyframeStep } from "../../types";
import "./index.scss";

export default ({ keyframeStep }: { keyframeStep: Accessor<KeyframeStep> }) => {
  return (
    <div class="keyframe-step-controller">
      <p>Keyframe step at {keyframeStep()?.percentage}%</p>
      <label>{keyframeStep()?.id}</label>
    </div>
  );
};
