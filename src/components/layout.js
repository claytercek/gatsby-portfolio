import React, {Component} from "react"
import useDarkMode from 'use-dark-mode';
import Header from "./header"
import { ThemeProvider } from 'emotion-theming'
import {dark, light} from './theme'
import { Global, css } from '@emotion/core'

require('typeface-montserrat')

const globalStyle = (theme) => (css`
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
`)

const wrapperStyle = (theme) => ({
  display: "flex"
});


const Layout = ({ children }) => {
  const darkMode = useDarkMode(false).value;
  return (
    <ThemeProvider theme={darkMode ? dark : light}>
      <Global styles={globalStyle} />
      <div css={wrapperStyle}>
        <Header />
        <div css={wrapperStyle}>
          {children}
        </div> 
      </div>
    </ThemeProvider>
  )
}

export default Layout
