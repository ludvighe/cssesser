import { createSignal } from "solid-js";
import { cssKeyframeProps, cssUnits } from "../../../services/css.services";
import "./index.scss";

type PropInputValues = { prop: string; value: string; unit: string };

export default ({
  onChange,
}: {
  onChange: (value: string, values: PropInputValues) => void;
}) => {
  const [value, setValue] = createSignal<PropInputValues>({
    prop: "",
    value: "",
    unit: "",
  });

  const handleOnChange = (field: "prop" | "value" | "unit", val: string) => {
    setValue((prev) => ({ ...prev, [field]: val }));
    const valuesStr = `${value().prop}: ${value().value}${value().unit}`;
    onChange(valuesStr, value());
  };
  return (
    <div class="prop-input">
      <input
        type="text"
        list="css-var-list"
        placeholder="prop"
        onInput={(e: any) => handleOnChange("prop", e.target.value)}
        style={{ width: `${value().prop.length + 4}ch` }}
      />
      <datalist id="css-var-list">
        {cssKeyframeProps.map((prop) => (
          <option>{prop}</option>
        ))}
      </datalist>
      :
      <input
        type="text"
        placeholder="value"
        class="value-input"
        onInput={(e: any) => handleOnChange("value", e.target.value)}
        style={{ width: `${value().value.length + 4}ch` }}
      />
      <input
        type="text"
        list="css-unit-list"
        placeholder="unit"
        class="unit-input"
        onInput={(e: any) => handleOnChange("unit", e.target.value)}
        style={{ width: `${value().unit.length + 4}ch` }}
      />
      <datalist id="css-unit-list">
        {cssUnits.map((unit) => (
          <option>{unit}</option>
        ))}
      </datalist>
    </div>
  );
};
