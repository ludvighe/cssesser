type CSS_TimingFunction = "ease" | "ease-in" | "ease-in-out" | "ease-out";
type CSS_Duration = {
  duration: number;
  unit: "s" | "ms";
};

type CSS_Transition = {
  property: string;
  duration: CSS_Duration;
  timingFunction?: CSS_TimingFunction;
  delay?: CSS_Duration;
};
