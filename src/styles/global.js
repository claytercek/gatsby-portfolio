import {css} from '@emotion/core'

export default css`
  * {
    box-sizing: border-box;
  }

  html {
    font-size: 100%;
  }

  #___gatsby,
  body,
  html {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  p {
    line-height: 1.5;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  ul,
  p {
    margin: 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }
`
