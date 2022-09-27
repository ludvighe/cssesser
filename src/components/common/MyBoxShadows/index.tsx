import { createSignal, Index, onMount } from "solid-js";
import { randomBoxShadow } from "../../../services/random.service";
import "./index.scss";

type Shadow = {
  id: number;
  shadow: string;
};

const localStorageKey = "vis-box-shadows";

export default () => {
  const [shadows, setShadows] = createSignal<Shadow[]>([]);
  const [show, setShow] = createSignal(false);

  onMount(() => {
    const stored = window.localStorage.getItem(localStorageKey);
    if (stored) {
      try {
        setShadows(JSON.parse(stored));
      } catch (e) {}
    }
  });

  const saveShadows = () => {
    window.localStorage.setItem(localStorageKey, JSON.stringify(shadows()));
  };

  const handleOnCreateShadow = () => {
    let id = 0;
    if (shadows().length !== 0)
      id = Math.max(...shadows().map((c) => c.id)) + 1;
    setShadows([...shadows(), { id, shadow: randomBoxShadow() }]);
    saveShadows();
  };

  const handleOnUpdateShadow = (shadow: Shadow) => {
    setShadows(shadows().map((c) => (c.id === shadow.id ? shadow : c)));
    saveShadows();
  };

  const handleOnRemoveShadow = (shadow: Shadow) => {
    setShadows([...shadows().filter((c) => c.id !== shadow.id)]);
    saveShadows();
  };
  return (
    <aside
      id="my-shadows"
      class={"side-menu" + (show() ? " __show" : " __hide")}
      onMouseLeave={() => setShow(false)}
    >
      <div class="tag" onClick={() => setShow(!show())}>
        Shades
      </div>
      <div class="side-menu-list">
        {shadows().length === 0 && <h2>No saved box shadows</h2>}
        <Index each={shadows()}>
          {(shadow) => (
            <div class="list-item-container">
              <div class="shadow-preview">
                <div class="shadow-preview-box" style={shadow().shadow}></div>
              </div>
              <input
                type="text"
                value={shadow().shadow}
                onInput={(e: any) =>
                  handleOnUpdateShadow({
                    ...shadow(),
                    shadow: e.target.value,
                  })
                }
              />
              <button
                onClick={() => navigator.clipboard.writeText(shadow().shadow)}
              >
                Copy
              </button>
              <button
                onClick={() => handleOnRemoveShadow(shadow())}
                style={{ "background-color": "var(--clr-error)" }}
              >
                Remove
              </button>
            </div>
          )}
        </Index>
      </div>

      <button onClick={handleOnCreateShadow}>Add new shadow</button>
    </aside>
  );
};
