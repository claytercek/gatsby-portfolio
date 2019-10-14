import React, { Component } from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import styles from "./header.module.scss"
class Header extends Component {
  constructor(props) {
    super(props)
    this.state = { isOpen: false }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState(state => ({
      isOpen: !state.isOpen,
    }))
    if (!this.state.isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

  }

  render() {
    const splitString = this.props.data.site.siteMetadata.title.split(" ");
    return (
      <header className={[this.state.isOpen ? styles.opened : "", "mainPad"].join(' ')}>
        <div>
          <Link className={styles.logo} to={"/"}>
            <span>{splitString[0]}</span> {splitString.slice(1).join(" ")}
          </Link>
          <button onClick={this.handleClick} aria-label="menu toggle"/>
        </div>
        <nav>
          <ul>
            {this.props.data.site.siteMetadata.menu.map((link, index) => {
              var delay = (this.state.isOpen) ? 0.45 + 0.15 * index : 0.0;
              console.log(delay);
              return (
                <li>
                  <Link to={link.slug} activeClassName="active" style={{transitionDelay: `${delay}s`}}>{link.name}</Link> 
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
