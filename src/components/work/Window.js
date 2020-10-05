import {css} from '@emotion/core'
import React from 'react'
import {borderLine, shadow} from 'styles/mixins'

export default function Window({children, tag}) {
  const Tag = tag ?? 'div'
  return (
    <Tag css={wrapperStyle}>
      <span aria-hidden="true" css={barStyle}>
        <span css={circleStyle} />
        <span css={circleStyle} />
        <span css={circleStyle} />
        <span css={linesStyle} />
      </span>
      <div>{children}</div>
    </Tag>
  )
}

const wrapperStyle = theme => css`
  ${borderLine(theme)}
  ${shadow(theme)}
  background: ${theme.colors.white};

  & > div {
    padding: ${theme.spacing.small};
  }
`

const barStyle = theme => css`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: ${theme.colors.grey};
  border-bottom: ${theme.colors.black} ${theme.lineWidth} solid;
  padding: ${theme.spacing.small};
`

const circleStyle = theme => css`
  display: block;
  height: 10px;
  width: 10px;
  border-radius: 10px;
  background: ${theme.colors.black};
  margin-right: ${theme.spacing.xsmall};
`

const linesStyle = theme => css`
  display: block;
  height: 8px;
  flex: 1;
  margin-left: ${theme.spacing.xsmall};
  border-top: ${theme.colors.black} ${theme.lineWidth} solid;
  border-bottom: ${theme.colors.black} ${theme.lineWidth} solid;
  position: relative;

  &::before {
    position: absolute;
    left: 0;
    right: 0;
    top: calc(50% - ${theme.lineWidth} / 2);
    content: '';
    display: block;
    width: 100%;
    height: ${theme.lineWidth};
    background: ${theme.colors.black};
  }
`
