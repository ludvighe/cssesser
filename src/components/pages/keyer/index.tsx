import { Keyframe, KeyframeStep } from "./types";
import "./index.scss";
import { createSignal, createUniqueId } from "solid-js";
import { KeyframeController } from "./components/KeyframeController";
import { KeyframeTimeline } from "./components/KeyframeTimeline";

const initialKeyframe: Keyframe = {
  name: "initial-key-frame",
  duration: { value: 1, unit: "s" },
  steps: [],
};

export default () => {
  const [keyframe, setKeyframe] = createSignal(initialKeyframe);
  const handleOnKeyframeChange = (keyframe: Keyframe) => {
    setKeyframe(keyframe);
  };

  const handleOnStepChange = (step: KeyframeStep, del = false) => {
    const isNew = !keyframe().steps.find((s) => s.id === step.id);
    if (isNew) {
      setKeyframe((prev) => ({ ...prev, steps: [...prev.steps, step] }));
    } else if (del) {
      setKeyframe((prev) => ({
        ...prev,
        steps: prev.steps.filter((s) => s.id !== step.id),
      }));
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
