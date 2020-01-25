import { Link, StaticQuery } from "gatsby"
import React, { Component } from "react"
import {mainPad} from "./layout";
import { css } from "@emotion/core"

const headerStyle = theme => css`
  ${mainPad(theme)};
  top: 0;
  left: 0;
  right: 0;
  z-index:10;
  overflow: hidden !important;
  align-items: flex-start;
  justify-content: space-between;
  background-color: ${theme.colors.bg};
  display: flex;
  flex-wrap: wrap;
  transform: translateY(0);
  position:fixed;
  font-size: 1rem;
  min-height: 40px;
  transition: min-height 0.6s ${theme.bezier} 0.16s, transform 0.6s ${theme.bezier};

  ${theme.mq.medium} {
    font-size: 1.2rem;
    padding-bottom: ${theme.pad * 2}px;
  }
  ${theme.mq.large} {
    font-size: 1.3rem;
  }

  &::after {
    content: "";
    position: absolute;
    top: 80px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${theme.colors.primary};
    transition: all 0.6s ${theme.bezier} 0.1s;

    ${theme.mq.medium} {
      display: none;
    }
  }


  &.opened {
    min-height: 100%;
    transition: min-height 0.7s ${theme.bezier} 0s;
    transform: translateY(0) !important;

    ${theme.mq.medium} {
      min-height: 0;
      transition: none;
    }

    &::after {
      top:100%;
      transition: all 0.8s ${theme.bezier} 0.06s;
    }
  }


  &.hidden {
    transform: translateY(-100%);
  }
`

const navStyle = theme => css`
  position: absolute;
  top: 80px;
  list-style-type: none;
  padding: 0;
  margin: 0;
  flex-basis: 100%;

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }


  ${theme.mq.medium} {
    position: static;
    flex-basis: 0;
    ul {
      display: flex;
    }
  }
`

const linkStyle = theme => css`
  a {
    color: ${theme.colors.primary};
    text-decoration: none;
  }
  text-transform: uppercase;
  font-size: 1em;

  ${theme.mq.medium} {
    margin-left: ${theme.pad * 2}px;
  }
`

const logoStyle = theme => css`
  text-transform: uppercase;
  font-size: 1.2em;
  font-weight: 300;
  span {
    font-weight: 600;
  }
`

const buttonStyle = theme => css`
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
    height: 2px;
    width: 28px;
    position: absolute;
    left: 8px;
    background-color: ${theme.colors.primary};
    transform: none;
    transition: transform 0.2s ${theme.bezier};
  }

  &::before {
    top: 7px;
  }

  &::after {
    bottom: 7px;
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
      scrollPos: 0,
      show: true
     }
    this.toggleOpen = this.toggleOpen.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.header = React.createRef();
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }
  
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  toggleOpen() {
    this.setState(state => ({
      opened: !state.opened
    }));
  }

  handleScroll() {
    const { scrollPos } = this.state;
    if (document.body.getBoundingClientRect().top > -50 || this.state.opened) {
      return;
    } 
    this.setState({
      scrollPos: document.body.getBoundingClientRect().top,
      show: document.body.getBoundingClientRect().top > scrollPos
    });
  }

  render() {
    var data = this.props.data.site.siteMetadata;

    const splitString = data.title.split(" ");
    
    var headerClasses = [
      this.state.opened ? "opened" : "",
      this.state.show ? "" : "hidden"
    ].join(" ");

    return (
      <header css={headerStyle} className={headerClasses} ref={this.header}>
        <Link css={logoStyle} to={"/"}>
          <span>{splitString[0]}</span> {splitString.slice(1).join(" ")}
        </Link>
        <button css={buttonStyle} onClick={this.toggleOpen}/>
        <nav css={navStyle}>
          <ul >
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
