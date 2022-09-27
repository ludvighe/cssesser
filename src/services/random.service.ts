// NUMBERS //

export const getRandomNumber = (from: number, to: number) => {
  return Math.floor(Math.random() * to) + from;
};

// COLORS & CSS //

export const randomHexColor = () => {
  return "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
};

export const randomLinearGradient = () => {
  const rotation = getRandomNumber(0, 359);
  const position1 = getRandomNumber(10, 40);
  const position2 = getRandomNumber(60, 90);
  const color1 = randomHexColor();
  const color2 = randomHexColor();
  return `linear-gradient(${rotation}deg, ${color1} ${position1}%, ${color2} ${position2}%)`;
};

export const randomBoxShadow = () => {
  const color = randomHexColor();
  const hOffset = getRandomNumber(0, 30);
  const vOffset = getRandomNumber(0, 30);
  const blur = getRandomNumber(0, 30);
  const spread = getRandomNumber(0, 10);

  return `box-shadow: ${color} ${hOffset}px ${vOffset}px ${blur}px ${spread}px;`;
};
