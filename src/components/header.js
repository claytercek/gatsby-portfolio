import { Link, StaticQuery } from "gatsby"
import React, {Component} from "react"
import styled from "@emotion/styled"
import {css} from "@emotion/core"

const headerStyle = theme => (css`
  transform: rotate(-180deg);
  writing-mode: vertical-lr;
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: inherit;
  padding-top: ${theme.pad}px;
  padding-bottom: ${theme.pad}px;
  font-size: 1rem;
  ${theme.mq.small} {
    font-size: 1.2rem;
    padding-top: ${theme.pad * 1.5}px;
    padding-bottom: ${theme.pad * 1.5}px;
  }
`)

const headerWrapper = (theme) => (css`
  width: 40px;
  position: relative;
  * {
    margin: 0;
  }
  ${theme.mq.small} {
    width: 60px;
  };
`);

const navStyle = (theme) => (css`
  list-style-type: none;
  display: flex;
  padding: 0;
`);

const separatorStyle = (theme) => (css`
  flex: 1;
  border-left: ${theme.lineWidth} solid ${theme.colors.primary};
  margin-top: ${theme.pad}px;
  margin-bottom: ${theme.pad}px;
`);

const linkStyle = (theme) => (css`
  :not(:first-child) {
    margin-top: ${theme.pad}px;
  }
  a {
    color: ${theme.colors.primary};
    text-decoration: none;
  }
  text-transform: uppercase;
  font-size: 1em;
`)

const logoStyle = (theme) => (css`
  text-transform: uppercase;
  font-size: 1.2em;
  font-weight: 300;
  span {
    font-weight: 600;
  }
`)


class Header extends Component {
  render() {
    var data = this.props.data.site.siteMetadata;
    const splitString = data.title.split(" ");
    return (
    <div css={headerWrapper}>
      <header css={headerStyle}>
        <Link css={logoStyle} to={"/"}>
          <span>{splitString[0]}</span> {splitString.slice(1).join(" ")}
        </Link>
        <div css={separatorStyle}/>
        <nav>
          <ul css={navStyle}>
            {data.menu.map((link, index) => {
              return (
                <li css={linkStyle}>
                  <Link to={link.slug}>{link.name}</Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </header>
    </div>
    )
  }
}

export default () => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
            menu {
              name
              slug
            }
          }
        }
      }
    `}
    render={query => <Header data={query} />}
  />
)
