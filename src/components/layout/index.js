import React from "react"
import Header from "./Header"
import "typeface-montserrat"

export default ({ children }) => {
  return (
    <div className={"content"}>
      <Header />
      {children}
    </div>
  )
}
