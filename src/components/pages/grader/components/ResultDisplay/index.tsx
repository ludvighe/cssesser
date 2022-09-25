import { Accessor, createEffect, createSignal } from "solid-js";
import { Gradient } from "../../types";
import { gradientToString } from "../../utils";
import "./index.scss";

export default ({ gradient }: { gradient: Accessor<Gradient> }) => {
  const [copied, setCopied] = createSignal(false);

  const handleOnCopy = () => {
    const value = gradientToString(gradient());
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 4000);
  };

  return (
    <code
      class="grader-result-display"
      onClick={handleOnCopy}
      title="Click to copy"
    >
      {gradientToString(gradient())}
    </code>
  );
};
