import layout from "./layout"
import utils from "./utils"
import { jsx, css } from '@emotion/core'

export default theme => css`
  ${layout(theme)};
  ${utils(theme)};  
`