export const colors = {
  white: '#FFFFFF',
  black: '#000000',
  grey: 'lightgrey',
  violet: '#4347C3',
}

export const lineWidth = '2px'

export const spacing = {
  xsmall: '4px',
  small: '8px',
  medium: '16px',
  large: '32px',
  xlarge: '64px',
}

export const breakpoints = {
  small: 576,
  medium: 768,
  large: 1280,
}

export const mq = {}

Object.keys(breakpoints).forEach(
  key => (mq[key] = `@media (min-width: ${breakpoints[key]}px)`),
)
