import React, { Component } from "react"
import { css, jsx } from "@emotion/core"
import { throws } from "assert"

const wrapperStyle = theme => css`
  line-height: 1;
  display: flex;
  flex-direction: column-reverse;
  * {
    margin: 0;
  }
`

const titleStyle = theme => css`
  line-height: 1;
  text-transform: uppercase;
  @supports (-webkit-text-stroke: 1px ${theme.colors.primary}) {
    -webkit-text-stroke: 2px ${theme.colors.primary};
    color: ${theme.colors.bg};
  }
  font-size: 2rem;
  ${theme.mq.small} {
    font-size: 2.2rem;
  }
  ${theme.mq.medium} {
    font-size: 4.8vw;
  }
  margin-top: ${theme.pad / 2}px;
`

const subtitleStyle = theme => css`
  margin: 0;
  line-height: 1;
  font-weight: 300;
  text-transform: uppercase;
  font-size: 0.8rem;
  margin-bottom: -0.2rem;
  ${theme.mq.medium} {
    font-size: 1.2rem;
    margin-bottom: -0.6vw;
  }
`

const Headline = props => (
  <div css={wrapperStyle} {...props}>
    <h2 css={titleStyle}>{props.title}</h2>
    <h3 css={subtitleStyle}>{props.subtitle}</h3>
  </div>

)

export default Headline
