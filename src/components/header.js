import { Link, StaticQuery } from "gatsby"
import React, { Component } from "react"
import { css } from "@emotion/core"
import Headroom from "react-headroom"

const headerStyle = theme => css`
  align-items: flex-start;
  justify-content: space-between;
  background-color: ${theme.colors.bg};
  display: flex;
  flex-wrap: wrap;
  font-size: 1.3rem;
  position: relative;
  padding-top: ${theme.pad}px;
  padding-bottom: ${theme.pad}px;

  ${theme.mq.medium} {
    padding-top: ${theme.pad * 1.5}px;
    padding-bottom: ${theme.pad * 1.5}px;
  }
  ${theme.mq.large} {
    font-size: 1.4rem;
    padding-top: ${theme.pad * 2}px;
    padding-bottom: ${theme.pad * 2}px;
  }
`

const navStyle = theme => css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  background-color: ${theme.colors.bg};
  list-style-type: none;
  padding: 0;
  margin: 0;
  height: 0;
  flex-basis: 100%;
  transition: height 0.6s ${theme.bezier};
  overflow: hidden;

  .opened & {
    height: 100vh;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    margin-top: 70px;
  }


  ${theme.mq.medium} {
    position: static;
    height: unset;
    flex-basis: auto;
    ul {
      display: flex;
      margin-top: 0;
      padding: 0;
    }
    overflow: visible;
    margin-right: -4px;
    padding-right: 4px;
  }
`


const linkStyle = theme => css`
  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    position: relative;
    margin-bottom: 1.2rem;
    padding-bottom: 0.5rem;

    &::after{
      height: 15%;
      margin-top: 5px;
      background: ${theme.colors.accent};
    }
  }

  text-transform: uppercase;
  font-size: 1em;
  font-weight:700;

  ${theme.mq.medium} {
    margin-left: ${theme.pad * 2}px;

    font-size: 1em;
  }
`

const logoStyle = theme => css`
  z-index: 30;
  text-transform: uppercase;
  font-size: 1em;
  font-weight: 700;
  color: ${theme.colors.primary};
  span {
    font-weight: 700;
  }
`

const buttonStyle = theme => css`
  z-index: 30;
  position: relative;
  border: none;
  background-color: transparent;
  padding-right: 0;
  pointer-events: all;
  cursor: pointer;
  width: 36px;
  height: 24px;

  border: none;
  outline: none;

  &::before,
  &::after {
    content: " ";
    height: 3px;
    width: 28px;
    position: absolute;
    left: 8px;
    background-color: ${theme.colors.primary};
    transform: none;
    transition: transform 0.2s ${theme.bezier};
  }

  &::before {
    top: 6px;
  }

  &::after {
    bottom: 6px;
  }


  .opened & {
    &::before {
      transform: rotate(45deg) translate(3px, 3px);
    }
    &::after {
      transform: rotate(-45deg) translate(3px, -3px);
    }
  }


  ${theme.mq.medium} {
    display: none;
  }

`

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      opened: false,
      pinStart: 0,
     }
    this.toggleOpen = this.toggleOpen.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    var pinStart = parseInt(window.getComputedStyle(document.body).paddingTop, 10);
    this.setState({ pinStart: pinStart});
  }

  toggleOpen() {
    this.setState(state => ({
      opened: !state.opened
    }));
  }

  render() {
    var data = this.props.data.site.siteMetadata;

    const splitString = data.title.split(" ");

    return (
      <Headroom pinStart={this.state.pinStart} forcePin={this.state.opened} wrapperStyle={{zIndex: 10}}>
        <header css={headerStyle} className={this.state.opened ? "l-mainPad opened" : "l-mainPad"}>
          <Link css={logoStyle} to={"/"}>
            <span>{splitString[0]}</span> {splitString.slice(1).join(" ")}
          </Link>
          <button css={buttonStyle} onClick={this.toggleOpen}/>
          <nav css={navStyle}>
            <ul className={"l-mainPad"}>
              {data.menu.map((link, index) => {
                return (
                  <li css={linkStyle}>
                    <Link activeClassName="u-underline-anim--active" className="u-underline-anim" to={link.slug}>{link.name}</Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </header>
      </Headroom>
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
