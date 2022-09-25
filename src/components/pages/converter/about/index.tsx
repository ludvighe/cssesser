import { createSignal, onCleanup, onMount } from "solid-js";
import "./index.scss";

export default ({
  about,
}: {
  about: {
    title: string;
    acronym: string;
    description: any;
    resource: string;
  };
}) => {
  const [show, setShow] = createSignal(false);
  const id = "help-" + about.acronym;
  const onclick = (e: any) => {
    if (e.target.id !== id) setShow(false);
  };
  onMount(() => {
    window.removeEventListener("click", onclick);
    window.addEventListener("click", onclick);
  });
  onCleanup(() => {
    window.removeEventListener("click", onclick);
  });
  return (
    <div class="about-container">
      <div onClick={(e) => setShow(true)} id={id}>
        🛈
      </div>
      <div
        class="about-popup"
        onMouseOver={() => setShow(true)}
        style={{ transform: show() ? "translateX(0)" : "translateX(100vw)" }}
      >
        <header>
          <h1>
            {about.title}
            {about.acronym !== about.title && <span>({about.acronym})</span>}
          </h1>
          <div onClick={() => setShow(false)} class="close-button">
            ⨯
          </div>
        </header>
        <div>{about.description}</div>
        <a href={about.resource} target="_blank" rel="noopener noreferer">
          Learn more
        </a>
      </div>
    </div>
  );
};
