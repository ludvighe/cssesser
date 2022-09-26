import { createSignal, Index, onMount } from "solid-js";
import { randomLinearGradient } from "../../../services/random.service";
import "./index.scss";

type Gradient = {
  id: number;
  gradient: string;
};

const localStorageKey = "vis-gradients";

export default () => {
  const [gradients, setGradients] = createSignal<Gradient[]>([]);
  const [show, setShow] = createSignal(false);

  onMount(() => {
    const stored = window.localStorage.getItem(localStorageKey);
    if (stored) {
      try {
        setGradients(JSON.parse(stored));
      } catch (e) {}
    }
  });

  const saveGradients = () => {
    window.localStorage.setItem(localStorageKey, JSON.stringify(gradients()));
  };

  const handleOnCreateGradient = () => {
    let id = 0;
    if (gradients().length !== 0)
      id = Math.max(...gradients().map((c) => c.id)) + 1;
    setGradients([...gradients(), { id, gradient: randomLinearGradient() }]);
    saveGradients();
  };

  const handleOnUpdateGradient = (gradient: Gradient) => {
    setGradients(gradients().map((c) => (c.id === gradient.id ? gradient : c)));
    saveGradients();
  };

  const handleOnRemoveGradient = (gradient: Gradient) => {
    setGradients([...gradients().filter((c) => c.id !== gradient.id)]);
    saveGradients();
  };
  return (
    <aside
      id="my-gradients"
      class={"side-menu" + (show() ? " __show" : " __hide")}
    >
      <div class="tag" onClick={() => setShow(!show())}>
        Grades
      </div>
      <div class="side-menu-list">
        {gradients().length === 0 && <h2>No saved gradients</h2>}
        <Index each={gradients()}>
          {(gradient) => (
            <div class="list-item-container">
              <div
                class="gradient-preview"
                style={`background: ${gradient().gradient}`}
              />
              <input
                type="text"
                value={gradient().gradient}
                onInput={(e: any) =>
                  handleOnUpdateGradient({
                    ...gradient(),
                    gradient: e.target.value,
                  })
                }
              />
              <button
                onClick={() =>
                  navigator.clipboard.writeText(gradient().gradient)
                }
              >
                Copy
              </button>
              <button
                onClick={() => handleOnRemoveGradient(gradient())}
                style={{ "background-color": "var(--clr-error)" }}
              >
                Remove
              </button>
            </div>
          )}
        </Index>
      </div>

      <button onClick={handleOnCreateGradient}>Add new gradient</button>
    </aside>
  );
};
