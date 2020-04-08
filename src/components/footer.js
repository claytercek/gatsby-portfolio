import { Link, StaticQuery } from "gatsby"
import React, { Component } from "react"
import { css } from "@emotion/core"
import {addHoverClass} from "./utils"

function Footer(props) {
  return (
    <footer css={footerStyle} className="l-mainPad">
      <nav aria-label="Social Links">
        <ul>
          {props.data.social.map((item, index) => (
            <li><a 
              href={item.slug} 
              target="_blank" 
              class="u-underline-anim"
              onMouseOver={addHoverClass}
            >
              {item.name}
            </a></li>
          ))}
        </ul>
      </nav>
      <p class="copyright">&copy; Clay Tercek 2020</p>
    </footer>
  )
}

const footerStyle = theme => css`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.bg};

  padding-top: ${theme.pad * 2}px;
  padding-bottom: calc(${theme.pad * 2}px - 0.25rem);

  ${theme.mq.medium} {
    display: flex;
    justify-content: space-between;
  }

  margin: 0;
  * {
    margin: 0;
  }

  .copyright, nav a {
    font-weight: 400;
    text-transform: uppercase;
    font-size: 0.9rem;

    ${theme.mq.medium} {
      font-size: 1rem;
    }
  }

  nav ul {
    position: relative;
    padding-bottom: 0.25rem;
    list-style-type: none;
    padding: 0;
    margin-bottom: ${theme.pad}px;

    ${theme.mq.medium} {
      display: flex;
      margin-bottom: 0;

      a {
        margin-bottom: 0;
        display: block;
      }
    }

    a {
      display: inline-block;
      margin-right: ${theme.pad}px;
      margin-bottom: 4px;
    }

    a::after {
      height: 1px;
      background: ${theme.colors.bg};
    }
  }
`
export default () => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            social {
              name
              slug
            }
          }
        }
      }
    `}
    render={query => <Footer data={query.site.siteMetadata} />}
  />
)
