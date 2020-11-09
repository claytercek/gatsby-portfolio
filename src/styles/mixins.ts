import theme, {Theme} from './theme'

// eslint-disable-next-line import/prefer-default-export
export const mq = (
  breakpoint: keyof Theme['breakpoints'],
  type: 'min' | 'max' = 'min',
) => {
  return `@media (${type}-width: ${theme.breakpoints[breakpoint]}px)`
}
