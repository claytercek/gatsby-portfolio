const colors = {
  white: '#FFFFFF',
  black: '#000000',
  grey: 'lightgrey',
  violet: '#4347C3',
}

const line = '2px'

const spacing = {
  xsmall: '4px',
  small: '8px',
  medium: '16px',
  large: '32px',
  xlarge: '64px',
}

const breakpoints: {[index: string]: number} = {
  small: 576,
  medium: 768,
  large: 1280,
}

const mq: {[index: string]: string} = {}

Object.keys(breakpoints).forEach(
  key => (mq[key] = `@media (min-width: ${breakpoints[key]}px)`),
)

const theme = {colors, line, spacing, breakpoints, mq}

Object.freeze(theme)

export default theme

export type Theme = typeof theme
