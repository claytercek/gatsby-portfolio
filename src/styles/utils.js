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
      width: 0;
      right: 0;
      position: absolute;
      transition: all .25s ${theme.bezier};
    }

    &:hover {
      &:after {
        width: 100%;
        left: 0;
      }
    }
  }

  .u-underline-anim--active,
  .u-pageContent a {
    &:after {
      left: 0;
      right: 0;
      transition: none;
      width: auto;
    }

    &:hover {
      &:after {
        width: auto;
        transition: none;
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
