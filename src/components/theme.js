export const breakpoints = {
  small: 360,
  medium: 768,
  large: 992,
}

// convert breakpoints to media queries
Object.keys(breakpoints).map(key => {
  return (breakpoints[key] = `@media (min-width: ${breakpoints[key]}px)`)
})

const base = {
  font: {
    primary: "montserrat, helvetica, sans-serif",
  },
  mq: breakpoints,
  pad: 16,
  lineWidth: "1px",
  bezier: "cubic-bezier(0.555, 0.205, 0.295, 0.975)",
  easeIn: "cubic-bezier(.07,.58,.41,1)",
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
      accent: "#2222FFEE",
    },
    lineWidth: "1px",
  },
}

export default base
