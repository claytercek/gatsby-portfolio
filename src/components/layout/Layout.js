import React from 'react'
import {Global} from '@emotion/core'
import globalStyles from 'styles/global'

function Wrapper({children}) {
  return (
    <div>
      {children}
      <Global styles={globalStyles} />
    </div>
  )
}

function Main(props) {
  return <main {...props} />
}

const Layout = {
  Wrapper,
  Main,
}

export default Layout
