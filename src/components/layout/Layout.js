import React from 'react'
import {Global} from '@emotion/core'
import globalStyles from 'styles/global'
import {ThemeProvider} from 'emotion-theming'
import * as theme from 'styles/theme'

function Wrapper({children}) {
  return (
    <ThemeProvider theme={theme}>
      {children}
      <Global styles={globalStyles} />
    </ThemeProvider>
  )
}

function Main(props) {
  return (
    <main
      css={theme => ({
        padding: theme.spacing.medium,
        [theme.mq.small]: {
          padding: theme.spacing.large,
        },
        [theme.mq.large]: {
          padding: theme.spacing.xlarge,
        },
      })}
      {...props}
    />
  )
}

const Layout = {
  Wrapper,
  Main,
}

export default Layout
