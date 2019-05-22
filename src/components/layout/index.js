import React from "react"
import Header from "./Header"
import "typeface-crimson-text"
import "typeface-montserrat"

export default ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}
