const breakpoints = {
    small: 576,
    medium: 768,
    large: 992
}

// convert breakpoints to media queries
Object.keys(breakpoints).map((key) => {
        breakpoints[key] = `@media (min-width: ${breakpoints[key]}px)`;
})

const base = {
    font: {
        primary: "montserrat, helvetica, sans-serif"
    },
    fontSize: 1,
    mq: breakpoints,
    pad: 16,
    space: 25,
    lineWidth: "2px"
}

export const dark = {
    ...base, ...{
        colors: {
            primary: "#FFFFFF",
            bg: "#000000"
        }
    }
}

export const light = {
    ...base, ...{
        colors: {
            primary: "#000000",
            bg: "#FFFFFF"
        }
    }
}