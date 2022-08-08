const breakpoints = ["1em", "30em", "45em", "64em", "80em", "86em", "100em"];

const [xs, sm, md, xm, lg, ml, xl] = breakpoints;
breakpoints.xs = xs;
breakpoints.sm = sm;
breakpoints.md = md;
breakpoints.xm = xm;
breakpoints.lg = lg;
breakpoints.ml = ml;
breakpoints.xl = xl;

const fonts = {};

const colorSets = [
  {
    name: "primary",
    colors: [],
  },
  {
    name: "secondary",
    colors: [],
  },
  {
    name: "accent",
    colors: [],
  },
  {
    name: "grey",
    colors: [
      { name: 50, hex: "#F6F7F9" },
      { name: 100, hex: "#CCC" },
      { name: 150, hex: "#F6F6F6" },
      { name: 200, hex: "#6c757d" },
      { name: 300, hex: "#555" },
      { name: 400, hex: "#6A6A6A" },
      { name: 500, hex: "#545454" },
    ],
  },  
  {
    name: "success",
    colors: [
      { name: 50, hex: "#E5F9F6" },
      { name: 100, hex: "#00C851" },
      { name: 200, hex: "#007E33" },
      { name: 300, hex: "#00C9A7" },
    ],
  },
  {
    name: "info",
    colors: [
      { name: 100, hex: "#33b5e5" },
      { name: 200, hex: "#0099CC" },
    ],
  },
  {
    name: "danger",
    colors: [
      { name: 100, hex: "#ff4444" },
      { name: 200, hex: "#CC0000" },
    ],
  },
  {
    name: "warning",
    colors: [
      { name: 100, hex: "#ffbb33" },
      { name: 200, hex: "#FF8800" },
    ],
  },  
];

export const colors = colorSets.reduce(
  (colorMap, { name, alias = name, colors: colorSet }) => {
    const color = {};
    const cm = colorMap;
    for (let colorIndex = 0; colorIndex < colorSet.length; colorIndex++) {
      const { name: colorName, hex } = colorSet[colorIndex];
      color[colorIndex] = hex;
      color[colorName] = hex;
    }
    cm[name] = color;
    cm[alias] = color;
    return cm;
  },
  {    
    white: "#FFFFFF",
    "white.0": "#FFFFFF",
    black: "#000000",
    "black.0": "#000000",
  }
);

const radii = {
  small: "0.125rem",
  normal: "0.1875rem",
  large: "0.375rem",
  full: "10rem",
  square: 0,
};

const zIndices = {
  modal: 2000,
  tooltip: 5000,
  toast: 7000,
};

const shadows = [
  { name: "none", shadow: undefined },
  { name: "sm", shadow: "0 .075rem .15rem rgba(0,0,0,.15)" },
  { name: "xl", shadow: "0 0 1rem rgba(0,0,0,.15)" },
].reduce((shadowSet, { name, shadow }, index) => {
  const s = shadowSet;
  s[name] = shadow;
  s[index] = shadow;
  return s;
});

export const theme = {  
  breakpoints,
  radii,
  colors,
  zIndices,
  shadows,
  fonts,
};
