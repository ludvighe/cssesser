import { Accessor, createSignal, createUniqueId, For, Index } from "solid-js";
import { Keyframe, KeyframeStep } from "../../types";
import KeyframeStepController from "../KeyframeStepController";

import "./index.scss";

const getTimelineElement = () => document.querySelector("#keyframe-timeline");
const getPopupElement = () => document.querySelector("#timeline-popup");
const getSizes = () => {
  const timelineEl = getTimelineElement();
  const popupEl = getPopupElement();
  if (!timelineEl || !popupEl) return { timelineW: 0, timelineH: 0, popupW: 0 };
  const timelineW = timelineEl.clientWidth;
  const timelineH = timelineEl.clientHeight;
  const popupW = popupEl.clientWidth;
  return { timelineW, timelineH, popupW };
};

export const KeyframeTimeline = ({
  keyframe,
  onStepChange,
}: {
  keyframe: Accessor<Keyframe>;
  onStepChange: (step: KeyframeStep, del?: boolean) => void;
}) => {
  const [positions, setPositions] = createSignal({
    x: 0,
    y: 0,
    popupX: 0,
    popupY: 0,
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

  const handleOnClick = (step?: KeyframeStep, del: boolean = false) => {
    if (currentStep() !== null && !step) {
      setCurrentStep(null);
      return;
    }
    if (del && step) {
      onStepChange(step, true);
      setCurrentStep(null);
      return;
    }

    const { timelineW } = getSizes();
    const percentagePos = Math.round((positions().x / timelineW) * 100);
    if (!step)
      step = {
        id: createUniqueId(),
        percentage: percentagePos,
      };

    setTimeout(() => {
      const { popupW, timelineH } = getSizes();
      let popupX = timelineW * (step!.percentage * 0.01) - popupW / 2;
      if (popupX + popupW > timelineW) popupX -= popupW / 2;
      if (popupX - popupW / 2 < 0) popupX += popupW / 2;

      setPositions((prev) => ({ ...prev, popupX, popupY: timelineH }));
    }, 10);

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
            currentStep() === null
              ? "translateY(0)"
              : `translateY(${positions().popupY}px)`,
          opacity: currentStep() === null ? "0" : "1",
          // "z-index": currentStep() === null ? "-100" : "2",
          height: currentStep() === null ? "0px" : "max-content",
          padding: currentStep() === null ? "0" : "0.5em",
        }}
        // onMouseMove={(e: any) => e.stopPropagation()}
        onClick={(e: any) => e.stopPropagation()}
      >
        {currentStep() !== null && (
          <KeyframeStepController
            keyframeStep={currentStep as Accessor<KeyframeStep>}
            onClose={() => setCurrentStep(null)}
            onDelete={() => handleOnClick(currentStep()!, true)}
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
            style={{
              left: `${step().percentage}%`,
              "background-color":
                currentStep()?.id === step().id ? "var(--clr-secondary)" : "",
              "box-shadow":
                currentStep()?.id === step().id
                  ? "#fff5 0px 0px 3px inset"
                  : "var(--clr-secondary) 0px 0px 0px 0px",
            }}
          />
        )}
      </Index>

      <For each={Array.from({ length: 199 }, (_, index) => index + 1)}>
        {(i) =>
          i % 2 === 1 ? (
            <div
              class="percentage-indicator"
              onMouseMove={(e) => e.stopPropagation()}
              style={{ left: `calc(${i / 2}% - 1px)` }}
            />
          ) : (
            <></>
          )
        }
      </For>
    </div>
  );
};
