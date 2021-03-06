import layout from "./layout"
import utils from "./utils"
import { css } from "@emotion/core"

export default theme => css`
  ${layout(theme)};
  ${utils(theme)};

  html {
    &:before,
    &:after {
      content: "";
      position: fixed;
      right: 0;
      left: 0;
      height: 100%;
      z-index: -1;
    }

    &:before {
      top: -50%;
      background: ${theme.colors.bg};
    }

    &:after {
      bottom: -50%;
      background: ${theme.colors.primary};
    }

    -webkit-tap-highlight-color: rgba(0,0,0,0);
	  tap-highlight-color: rgba(0,0,0,0);
  }

  body {
    background-color: ${theme.colors.bg};
  }

  .headroom--scrolled {
    transition: transform 200ms ${theme.bezier} !important;
  }

  
`
