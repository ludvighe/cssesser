export type KeyframeStep = {
  id: string;
  percentage: number;
};

export type Keyframe = {
  name: string;
  //   transition: CSS_Transition;
  steps: KeyframeStep[];
};
