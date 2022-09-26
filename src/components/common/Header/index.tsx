import { useNavigate } from "@solidjs/router";
import { createEffect, createSignal, For } from "solid-js";
import { routes } from "../../..";
import { useIsMobile } from "../../../services/responsive.service";
import MyColors from "../MyColors";
import MyGradients from "../MyGradients";
import "./index.scss";

export default () => {
  const [currentPath, setCurrentPath] = createSignal(window.location.pathname);
  const navigate = useNavigate();

  createEffect(() => {
    if (currentPath() === "/") {
      navigateToPath(routes.grader.path);
    }
  });

  // Responsive
  const isMobile = useIsMobile();
  const [showMobile, setShowMobile] = createSignal(false);

  const navigateToPath = (path: string) => {
    navigate(path);
    setCurrentPath(path);
  };
  const getLinkClasses = (path: string) => {
    if (currentPath() === path) return "page-link current-link";
    return "page-link";
  };

  return (
    <>
      <header class="header">
        <div class="home-link">
          <h1>Cssesser</h1>
        </div>
        {!isMobile() ? (
          <nav>
            <For each={Object.entries(routes)}>
              {(route) => {
                const { name, path } = route[1];
                return (
                  <div
                    onClick={() => navigateToPath(path)}
                    class={getLinkClasses(path)}
                  >
                    {name}
                  </div>
                );
              }}
            </For>
          </nav>
        ) : (
          <div
            class="mobile-nav"
            style={{
              transform: showMobile()
                ? "translateY(0)"
                : "translateY(calc(-100% + 5rem))",
              "box-shadow": showMobile()
                ? "rgba(0, 0, 0, 0.35) 0px 5px 15px"
                : "none",
              "backdrop-filter": showMobile() ? "blur(10px)" : "none",
            }}
          >
            <div class="mobile-nav-links">
              <For each={Object.entries(routes)}>
                {(route) => {
                  const { name, path } = route[1];
                  return (
                    <div
                      onClick={() => {
                        navigateToPath(path);
                        setShowMobile(false);
                      }}
                      class={getLinkClasses(path)}
                    >
                      {name}
                    </div>
                  );
                }}
              </For>
            </div>
            <div
              class="mobile-nav-icon"
              onClick={() => setShowMobile(!showMobile())}
              style={{ transform: `rotate(${showMobile() ? 0.25 : 0}turn)` }}
            >
              ☰
            </div>
          </div>
        )}
      </header>
      <MyColors />
      <MyGradients />
    </>
  );
};
