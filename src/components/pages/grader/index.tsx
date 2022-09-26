import {
  lazy,
  createEffect,
  createSignal,
  createUniqueId,
  Index,
} from "solid-js";
import { randomHexColor } from "../../../services/random.service";
import "./index.scss";
import { ColorState, Gradient } from "./types";
import { gradientToString } from "./utils";

const ColorController = lazy(() => import("./components/ColorController"));
const GradientTypeSelector = lazy(
  () => import("./components/GradientTypeSelector")
);
const ResultDisplay = lazy(() => import("./components/ResultDisplay"));

const initialGradient: Gradient = {
  type: "linear-gradient",
  colors: [
    // { id: createUniqueId(), color: "magenta", position: 40, placement: 0 },
    // { id: createUniqueId(), color: "pink", position: 50, placement: 1 },
    // { id: createUniqueId(), color: "magenta", position: 60, placement: 2 },

    {
      id: createUniqueId(),
      color: randomHexColor(),
      position: Math.floor(Math.random() * (40 - 0)),
      placement: 0,
    },
    {
      id: createUniqueId(),
      color: randomHexColor(),
      position: Math.floor(Math.random() * (100 - 60) + 60),
      placement: 1,
    },
  ],
  rotation: 0,
};

export default () => {
  const [gradient, setGradient] = createSignal<Gradient>(initialGradient);

  // Initial animation
  const [animate, setAnimate] = createSignal(true);
  let interval: number | undefined;
  createEffect(() => {
    if (animate()) {
      interval = setInterval(() => {
        setGradient((prev) => ({
          ...prev,
          rotation: (prev.rotation + 1) % 360,
        }));
      }, 50);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  });

  const handleOnCreateColor = () => {
    let nextPosition =
      Math.max(...gradient().colors.map((color) => color.position)) + 5;
    if (nextPosition > 100) nextPosition = 100;
    if (!isFinite(nextPosition)) nextPosition = 0;

    const colorState = {
      id: createUniqueId(),
      color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      position: nextPosition,
      placement: gradient().colors.length,
    };
    setGradient((prev) => ({ ...prev, colors: [...prev.colors, colorState] }));
  };

  /** Updates ColorState in gratient.colors and removes it if placement === -1. */
  const handleOnColorStateChange = (state: ColorState) => {
    const currentState = gradient().colors.find(
      (current) => current.id === state.id
    );
    let newStates = gradient().colors.filter(
      (prevState) => prevState.id !== state.id
    );

    // Handle if overlapping positions
    if (currentState && currentState.position !== state.position) {
      const colors = gradient().colors;
      const prev = colors.find(
        (prev) => prev.placement === state.placement - 1
      );
      const next = colors.find(
        (prev) => prev.placement === state.placement + 1
      );
      const min =
        state.placement === 0 || !prev ? 0 : parseInt(prev.position.toString());
      const max =
        state.placement === colors.length - 1 || !next
          ? 100
          : parseInt(next.position.toString());

      if (state.position <= min) state.position = min;
      if (state.position >= max) state.position = max;
    }

    // Don't include if state.placement === -1 (remove)
    if (state.placement !== -1) {
      newStates.push(state);
    } else {
      // Sort placements if current should not be included
      newStates = newStates
        .sort((a, b) => (a.placement > b.placement ? 1 : -1))
        .map((state, index) => ({ ...state, placement: index }));
    }
    setGradient((prev) => ({ ...prev, colors: newStates }));
  };

  return (
    <div
      class="grader-page"
      onMouseMove={() => setAnimate(false)}
      onClick={() => setAnimate(false)}
    >
      {/* <h2>Grader</h2> */}
      <section class="grader-result">
        <ResultDisplay gradient={gradient} />
      </section>
      <section class="grader-editor">
        <textarea
          readonly
          class="grader-visualization"
          style={{
            background: gradientToString(gradient()),
          }}
        />
        <div class="grader-controllers">
          <GradientTypeSelector gradient={gradient} onChange={setGradient} />

          <div
            class="rotation-controller"
            style={
              gradient().type.includes("radial")
                ? {
                    opacity: 0,
                    "max-height": "0px",
                  }
                : { "max-height": "100px" }
            }
          >
            <label>Rotation (deg)</label>
            <input
              type="number"
              max="360"
              min="0"
              value={gradient().rotation}
              onInput={(e: any) =>
                setGradient((prev) => ({ ...prev, rotation: e.target.value }))
              }
            />
            <input
              type="range"
              max="360"
              min="0"
              value={gradient().rotation}
              onInput={(e: any) =>
                setGradient((prev) => ({ ...prev, rotation: e.target.value }))
              }
            />
          </div>

          <div class="color-list">
            <Index
              each={gradient().colors.sort((a: ColorState, b: ColorState) =>
                a.placement > b.placement ? 1 : -1
              )}
            >
              {(state) => (
                <ColorController
                  state={state}
                  onChange={handleOnColorStateChange}
                />
              )}
            </Index>
            <button onClick={handleOnCreateColor}>Add color</button>
            {gradient().colors.length < 2 && (
              <p class="error">
                You need at least two colors to render a gradient
              </p>
            )}
          </div>
        </div>
      </section>
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/CSS/gradient"
        target="_blank"
        rel="noopener noreferrer"
        class="learn-more-anchor"
      >
        Learn more
      </a>
    </div>
  );
};
