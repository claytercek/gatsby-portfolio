import React, { Component } from "react"
import useDarkMode from "use-dark-mode"
import Header from "./header"
import { ThemeProvider } from "emotion-theming"
import { dark, light } from "./theme"
import { Global, css } from "@emotion/core"

require("typeface-montserrat")

const globalStyle = theme => css`
  html {
    background-color: ${theme.colors.bg};
    font-family: ${theme.font.primary};
    color: ${theme.colors.primary};
    padding: 0;
  }

  body {
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`
const contentStyle = theme => css`
  flex: 1;
  padding: ${theme.pad}px;
  padding-left: 0;
  
  ${theme.mq.medium} {
    padding: ${theme.pad * 1.5}px;
    padding-left: 0;
  }
`

const wrapperStyle = theme => ({
  display: "flex",
})

const Layout = ({ children }) => {
  // following code isnt loading correctly on build
  // const darkMode = useDarkMode(false).value;
  const darkMode = true

  return (
    <ThemeProvider theme={darkMode ? dark : light}>
      <Global styles={globalStyle} />
      <div css={wrapperStyle}>
        <Header />
        <div css={contentStyle}>{children}</div>
      </div>
    </ThemeProvider>
  )
}

export default Layout
