import React from 'react'
import {Global} from '@emotion/core'
import globalStyles from 'styles/global'
import {ThemeProvider} from 'emotion-theming'
import theme, {Theme} from 'styles/theme'

// eslint-disable-next-line @typescript-eslint/ban-types
function Wrapper({children}: React.PropsWithChildren<{}>) {
  return (
    <ThemeProvider theme={theme}>
      {children}
      <Global styles={globalStyles} />
    </ThemeProvider>
  )
}

// eslint-disable-next-line @typescript-eslint/ban-types
function Main(props: React.PropsWithChildren<{}>) {
  return (
    <main
      css={(theme: Theme) => ({
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
