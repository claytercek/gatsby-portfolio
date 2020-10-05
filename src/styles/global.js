import {css} from '@emotion/core'
import typography from './typography'

export default css`
  ${typography}
  * {
    box-sizing: border-box;
  }

  html {
    font-size: 100%;
    font-family: 'poppins', -apple-system, Roboto, 'Open Sans', 'Helvetica Neue',
      sans-serif;
  }

  #___gatsby,
  body,
  html {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    position: relative;
  }

  body {
    background-image: url('pattern.png');
    background-size: 8px 8px;
    background-repeat: repeat;
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

  img,
  picture {
    display: block;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`
