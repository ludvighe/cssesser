import { Keyframe, KeyframeStep } from "./types";
import "./index.scss";
import { createSignal, createUniqueId } from "solid-js";
import { KeyframeController } from "./components/KeyframeController";
import { KeyframeTimeline } from "./components/KeyframeTimeline";

const initialKeyframe: Keyframe = {
  name: "initial-key-frame",
  steps: [
    { id: createUniqueId(), percentage: 10 },
    { id: createUniqueId(), percentage: 20 },
  ],
};

export default () => {
  const [keyframe, setKeyframe] = createSignal(initialKeyframe);
  const handleOnKeyframeChange = (keyframe: Keyframe) => {
    setKeyframe(keyframe);
  };
  const handleOnStepChange = (step: KeyframeStep) => {
    const isNew = !keyframe().steps.find((s) => s.id === step.id);
    if (isNew) {
      setKeyframe((prev) => ({ ...prev, steps: [...prev.steps, step] }));
    } else {
      setKeyframe((prev) => ({
        ...prev,
        steps: prev.steps.map((s) => {
          if (s.id === step.id) return step;
          return s;
        }),
      }));
    }
  };
  return (
    <div class="keyer-page">
      <KeyframeController
        keyframe={keyframe}
        onChange={handleOnKeyframeChange}
      />
      <KeyframeTimeline keyframe={keyframe} onStepChange={handleOnStepChange} />
    </div>
  );
};
