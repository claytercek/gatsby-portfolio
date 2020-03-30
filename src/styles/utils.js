import { jsx, css, keyframes } from '@emotion/core'

export default theme => css`
  .u-underline-anim,
  .u-pageContent a {
    position: relative;
    display: inline-block;
    white-space: nowrap;
    border-bottom: none;

    &:after {
      content: "";
      display: inline-block;
      bottom: 0;
      position: absolute;
      animation: .25s ${theme.bezier} ${oldLinkUnderline};
    }

    &:hover {
      &:after {
        animation: .25s ${theme.bezier} ${newLinkUnderline};
        left: 0;
        right: 0;
      }
    }
  }

  .u-underline-anim--active,
  .u-pageContent a {
    &:after {
      left: 0;
      right: 0;
      animation: none;
    }

    &:hover {
      &:after {
        animation: .25s ${theme.bezier} ${oldLinkUnderline}, 
        .25s ${theme.bezier} .25s ${newLinkUnderline};
      }
    }
  }
  
`


const oldLinkUnderline = keyframes`
  0% {
      left: 0;
      right: 0;
  }

  100% {
      left: 100%;
      right: 0px;
  }
`

const newLinkUnderline = keyframes`
  0% {
      left: 0px;
      right: 100%;
  }

  100% {
      left: 0;
      right: 0
  }
`
