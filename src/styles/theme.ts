const colors = {
  alpha: '#EAE8F5',
  beta: '#141320',
  gamma: '#5449C1',
}

const line = '2px'

const spacing = {
  xsmall: '4px',
  small: '8px',
  medium: '16px',
  large: '32px',
  xlarge: '64px',
}

const breakpoints = {
  alpha: 576,
  beta: 768,
  gamma: 1280,
}

const theme = {colors, line, spacing, breakpoints}

Object.freeze(theme)

export default theme

export type Theme = typeof theme
