import React from "react"
import styles from "./Headline.module.scss"
import "typeface-roboto-slab"
import "typeface-montserrat"

export default ({ children }) => {
  return (
    <div className={styles.headline}>
      {children}
    </div>
  )
}
