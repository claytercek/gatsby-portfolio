import React from "react"
// import useDarkMode from "use-dark-mode"
import Header from "./header"
import { ThemeProvider } from "emotion-theming"
import { dark, light } from "./theme"
import { Global, css } from "@emotion/core"
import GlobalStyles from '../styles/global'

require("typeface-montserrat")

let contentStyle = theme => css`
  margin-top: ${theme.pad * 1}px;
  padding-bottom: ${theme.pad * 2}px;

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
      <Global styles={GlobalStyles} />
      <Header />
      <div css={contentStyle} className={"l-mainPad"}>{children}</div>
    </ThemeProvider>
  )
}

export default Layout
