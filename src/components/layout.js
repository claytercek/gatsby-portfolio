import React from "react"
// import useDarkMode from "use-dark-mode"
import Header from "./header"
import { ThemeProvider } from "emotion-theming"
import { dark, light } from "./theme"
import { Global, css } from "@emotion/core"

require("typeface-montserrat")

const mainPad = theme => css`
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
`

const globalStyle = theme => css`
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
`
const contentStyle = theme => css`
  ${mainPad(theme)};
  
  margin-top: ${theme.pad * 1}px;

  ${theme.mq.medium} {
    margin-top: ${theme.pad * 2}px;
  }

  ${theme.mq.large} {
    margin-top: ${theme.pad * 2}px;
  }
`

const Layout = ({ children }) => {
  // following code isnt loading correctly on build
  // const darkMode = useDarkMode(false).value;
  const darkMode = false

  return (
    <ThemeProvider theme={darkMode ? dark : light}>
      <Global styles={globalStyle} />
      <Header />
      <div css={contentStyle}>{children}</div>
    </ThemeProvider>
  )
}

export default Layout
export {mainPad}
