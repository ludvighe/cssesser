import { Accessor } from "solid-js";
import { BoxShadow } from "../../types";
import { shadowsToString } from "../../utils";
import "./index.scss";

export default ({ boxShadow }: { boxShadow: Accessor<BoxShadow> }) => {
  const handleOnCopy = () => {
    const value = shadowsToString(boxShadow().shadows, true);
    navigator.clipboard.writeText(value);
  };
  return (
    <code
      class="box-shadow-result"
      onClick={handleOnCopy}
      title="Click to copy"
    >
      {shadowsToString(boxShadow().shadows, true)}
    </code>
  );
};
