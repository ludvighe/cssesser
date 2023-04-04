export type KeyframeStep = {
  id: string;
  percentage: number;
};

export type Keyframe = {
  name: string;
  duration: { value: number; unit: string };
  steps: KeyframeStep[];
};
