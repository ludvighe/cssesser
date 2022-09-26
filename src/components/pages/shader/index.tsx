import {
  createEffect,
  createSignal,
  createUniqueId,
  Index,
  lazy,
} from "solid-js";
import { randomHexColor } from "../../../services/random.service";
import { getRandomNumber } from "../../../services/random.service";
import "./index.scss";
import { BoxShadow, Shadow } from "./types";
import { initialBoxShadow } from "./utils";

const BoxShadowResult = lazy(() => import("./components/BoxShadowResult"));
const BoxShadowVisualizer = lazy(
  () => import("./components/BoxShadowVisualizer")
);
const ShadowController = lazy(() => import("./components/ShadowController"));

export default () => {
  const [boxShadow, setBoxShadow] = createSignal<BoxShadow>(initialBoxShadow);

  // Initial animation
  const [animate, setAnimate] = createSignal(true);
  let interval: number | undefined;
  createEffect(() => {
    if (animate()) {
      interval = setInterval(() => {
        setBoxShadow((prev) => ({
          ...prev,
          shadows: prev.shadows.map((shadow) => ({
            ...shadow,
            color: randomHexColor(),
            verticalOffset: getRandomNumber(0, 20),
            horizontalOffset: getRandomNumber(0, 20),
            blurRadius: getRandomNumber(0, 50),
            spread: getRandomNumber(0, 10),
          })),
        }));
      }, 2000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  });

  const [goCrazy, setGoCrazy] = createSignal(false);
  let goCrazyInterval: number | undefined;
  createEffect(() => {
    if (goCrazy()) {
      goCrazyInterval = setInterval(() => {
        const _shadows = Array(10)
          .fill({})
          .map(() => ({
            id: createUniqueId(),
            color: randomHexColor(),
            verticalOffset: getRandomNumber(0, 300),
            horizontalOffset: getRandomNumber(0, 300),
            blurRadius: getRandomNumber(0, 300),
            spread: getRandomNumber(0, 300),
            inset: false,
          }));
        setBoxShadow((prev) => ({
          ...prev,
          backgroundColor: randomHexColor() + "55",
          foregroundColor: randomHexColor() + "55",
          shadows: _shadows,
        }));
      }, 1000);
    } else {
      clearInterval(goCrazyInterval);
    }
    return () => clearInterval(goCrazyInterval);
  });

  const handleOnShadowChange = (shadow: Shadow) => {
    setBoxShadow((prev) => ({
      ...prev,
      shadows: prev.shadows.map((sh) => (sh.id === shadow.id ? shadow : sh)),
    }));
  };

  return (
    <div class="shader-page" onMouseMove={() => setAnimate(false)}>
      <section class="shader-result">
        <BoxShadowResult boxShadow={boxShadow} />
      </section>
      <section class="shader-visualization">
        <BoxShadowVisualizer
          boxShadow={boxShadow}
          setBoxShadow={setBoxShadow}
        />
      </section>
      <section class="shader-controllers">
        <Index each={boxShadow().shadows}>
          {(shadow) => (
            <ShadowController shadow={shadow} onChange={handleOnShadowChange} />
          )}
        </Index>
      </section>
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow"
        target="_blank"
        rel="noopener noreferrer"
        class="learn-more-anchor"
      >
        Learn more
      </a>
      <div
        class="go-crazy-button"
        onClick={() => {
          if (
            confirm("Are you sure you want this?") &&
            confirm("It will render the page very hard to use.") &&
            confirm("You'll have to reload the page to make it stop.")
          )
            setGoCrazy(true);
        }}
      >
        go disco
      </div>
    </div>
  );
};
