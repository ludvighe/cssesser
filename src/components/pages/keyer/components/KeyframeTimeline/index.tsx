import { Accessor, createSignal, createUniqueId, For, Index } from "solid-js";
import { Keyframe, KeyframeStep } from "../../types";
import KeyframeStepController from "../KeyframeStepController";

import "./index.scss";

const getTimelineElement = () => document.querySelector("#keyframe-timeline");
const getPopupElement = () => document.querySelector("#timeline-popup");
const getSizes = () => {
  const timelineEl = getTimelineElement();
  const popupEl = getPopupElement();
  if (!timelineEl || !popupEl) return { timelineW: 0, popupW: 0 };
  const timelineW = timelineEl.clientWidth;
  const popupW = popupEl.clientWidth;
  return { timelineW, popupW };
};

export const KeyframeTimeline = ({
  keyframe,
  onStepChange,
}: {
  keyframe: Accessor<Keyframe>;
  onStepChange: (step: KeyframeStep) => void;
}) => {
  const [positions, setPositions] = createSignal({
    x: 0,
    y: 0,
    popupX: 0,
    percentageX: 0,
  });
  const [currentStep, setCurrentStep] = createSignal<KeyframeStep | null>(null);

  const handleOnMouseOver = (e: any) => {
    if (currentStep() !== null) return;
    const { timelineW } = getSizes();
    const percentagePos = Math.round((positions().x / timelineW) * 100);
    setPositions((prev) => ({
      ...prev,
      x: e.offsetX,
      percentageX: percentagePos,
    }));
  };

  const handleOnClick = (step?: KeyframeStep) => {
    if (currentStep() !== null && !step) {
      setCurrentStep(null);
      return;
    }
    const { timelineW, popupW } = getSizes();

    let popupX = positions().x;
    if (popupX + popupW > timelineW) popupX -= popupW;
    setPositions((prev) => ({ ...prev, popupX }));

    const percentagePos = Math.round((positions().x / timelineW) * 100);
    if (!step)
      step = {
        id: createUniqueId(),
        percentage: percentagePos,
      };
    setCurrentStep(step);

    onStepChange(step);
  };

  return (
    <div
      class="keyframe-timeline"
      id="keyframe-timeline"
      onMouseMove={handleOnMouseOver}
      onClick={() => handleOnClick()}
      style={{
        "--left-pos": `${positions().x}px`,
        "--percentage-text":
          currentStep() === null ? `"${positions().percentageX}%"` : 0,
        cursor: currentStep() === null ? "grabbing" : "grab",
      }}
    >
      <div
        class="timeline-popup"
        id="timeline-popup"
        style={{
          left: `${positions().popupX}px`,
          transform:
            currentStep() === null ? "translateY(0)" : "translateY(-100%)",
          opacity: currentStep() === null ? "0" : "1",
          // "z-index": currentStep() === null ? "-100" : "2",
          height: currentStep() === null ? "0px" : "100px",
          padding: currentStep() === null ? "0" : "0.5em",
        }}
        onMouseMove={(e: any) => e.stopPropagation()}
        onClick={(e: any) => e.stopPropagation()}
      >
        {currentStep() !== null && (
          <KeyframeStepController
            keyframeStep={currentStep as Accessor<KeyframeStep>}
          />
        )}
      </div>

      <Index each={keyframe().steps}>
        {(step) => (
          <div
            onMouseMove={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleOnClick(step());
            }}
            class="keyframe-step-marker"
            style={{ left: `${step().percentage}%` }}
          />
        )}
      </Index>
    </div>
  );
};
