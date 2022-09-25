import { ColorState, Gradient } from "./types";

export const colorStatesToStringArr = (
  states: ColorState[],
  position = false
) => {
  const sortedStates = states.sort((a: ColorState, b: ColorState) =>
    a.placement > b.placement ? 1 : -1
  );

  if (position) {
    return sortedStates.map((state) => `${state.color} ${state.position}%`);
  } else {
    return sortedStates.map((state) => state.color);
  }
};

export const gradientToString = (gradient: Gradient) => {
  const colors = colorStatesToStringArr(gradient.colors, true).join(", ");
  switch (gradient.type) {
    case "linear-gradient":
      return `${gradient.type}(${gradient.rotation}deg, ${colors})`;
    case "conic-gradient":
      return `${gradient.type}(from ${gradient.rotation}deg, ${colors})`;
    case "radial-gradient":
      return `${gradient.type}(${colors})`;

    case "repeating-linear-gradient":
      return `${gradient.type}(${gradient.rotation}deg, ${colors})`;
    case "repeating-radial-gradient":
      return `${gradient.type}(${colors})`;
  }
};
