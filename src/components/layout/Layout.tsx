import React from 'react'
import {Global} from '@emotion/core'
import globalStyles from 'styles/global'
import {ThemeProvider} from 'emotion-theming'
import * as themeConf from 'styles/theme'
import {mq} from 'styles/mixins'

// eslint-disable-next-line @typescript-eslint/ban-types
function Wrapper({children}: React.PropsWithChildren<{}>) {
  return (
    <ThemeProvider theme={themeConf.default}>
      {children}
      <Global styles={globalStyles} />
    </ThemeProvider>
  )
}

// eslint-disable-next-line @typescript-eslint/ban-types
function Main(props: React.PropsWithChildren<{}>) {
  return (
    <main
      css={(theme: themeConf.Theme) => ({
        padding: theme.spacing.small,
        [mq('alpha')]: {
          padding: theme.spacing.medium,
        },
        [mq('gamma')]: {
          padding: theme.spacing.xlarge,
        },
      })}
      {...props}
    />
  )
}

// eslint-disable-next-line @typescript-eslint/ban-types
function Hero(props: React.PropsWithChildren<{}>) {
  return (
    <div
      css={(theme: themeConf.Theme) => ({
        minHeight: '72vh',
      })}
      {...props}
    />
  )
}

const Layout = {
  Wrapper,
  Main,
  Hero,
}

export default Layout
