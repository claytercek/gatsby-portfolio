import { Link, StaticQuery } from "gatsby"
import React, { Component } from "react"
import { css } from "@emotion/core"

export default function Footer(props) {
  return (
    <footer css={footerStyle} className="l-mainPad">
      <a href="mailto:hello@claytercek.com" target="_top" 
        class="contact u-underline-anim">contact</a>
      <p class="copyright">&copy; Clay Tercek 2020</p>
    </footer>
  )
}

const footerStyle = theme => css`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.bg};

  display: flex;
  justify-content: space-between;

  padding-top: ${theme.pad}px;
  padding-bottom: calc(${theme.pad}px - 0.25rem);

  ${theme.mq.medium} {
    padding-top: ${theme.pad * 2}px;
    padding-bottom: calc(${theme.pad * 2}px - 0.25rem);
  }

  margin: 0;
  * {
    margin: 0;
  }

  .copyright, .contact {
    font-weight: 400;
    text-transform: uppercase;
    font-size: 0.9rem;

    ${theme.mq.medium} {
      font-size: 1rem;
    }
  }

  .contact {
    position: relative;
    padding-bottom: 0.25rem;

    &::after {
      height: 1px;
      background: ${theme.colors.bg};
    }
  }
`