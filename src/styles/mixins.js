import {css} from '@emotion/core'
import {transparentize} from 'polished'

export const borderLine = theme => css`
  border: ${theme.colors.black} ${theme.lineWidth} solid;
`
export const shadow = theme => css`
  box-shadow: ${theme.spacing.medium} ${theme.spacing.medium}
    ${transparentize(0.7, theme.colors.violet)};
`
