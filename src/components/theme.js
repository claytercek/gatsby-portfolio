export const breakpoints = {
  small: 360,
  medium: 768,
  large: 992,
}

// convert breakpoints to media queries
Object.keys(breakpoints).map(key => {
  breakpoints[key] = `@media (min-width: ${breakpoints[key]}px)`;
  return;
})

const base = {
  font: {
    primary: "montserrat, helvetica, sans-serif",
  },
  mq: breakpoints,
  pad: 16,
  lineWidth: "1px",
  bezier: "cubic-bezier(.555, .205, .295, .975)",
  easeIn: "cubic-bezier(.07,.58,.41,1)"
}

export const dark = {
  ...base,
  ...{
    colors: {
      primary: "#FFFFFF",
      bg: "#000000",
    },
  },
}

export const light = {
  ...base,
  ...{
    colors: {
      primary: "#000000",
      bg: "#FFFFFF",
      accent: "#2222FFDD"
    },
    lineWidth: "1px",
  },
}

export default base;
