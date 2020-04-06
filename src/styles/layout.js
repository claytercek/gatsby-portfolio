import { jsx, css } from "@emotion/core"

export default theme => css`
  html {
    background-color: ${theme.colors.bg};
    font-family: ${theme.font.primary};
    color: ${theme.colors.primary};
    padding: 0;
  }

  body {
    margin: 0;
    padding: 0;

    ${theme.mq.large} {
      padding-top: ${theme.pad * 2}px;
    }
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

  style {
    // fixing an issue with flash of unstyled content
    display: none !important;
  }

  .l-mainPad {
    margin: 0;
    max-width: ${1440}px;
    padding-left: ${theme.pad * 1.5}px;
    padding-right: ${theme.pad * 1.5}px;
    margin-left: auto;
    margin-right: auto;

    ${theme.mq.medium} {
      font-size: 1.2rem;
      padding-left: ${theme.pad * 2}px;
      padding-right: ${theme.pad * 2}px;
    }

    ${theme.mq.large} {
      font-size: 1.2rem;
      padding-left: ${theme.pad * 4}px;
      padding-right: ${theme.pad * 4}px;
    }
  }
`
