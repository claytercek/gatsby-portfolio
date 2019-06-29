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
  }

  render() {
    return (
      <header className={[this.state.isOpen ? styles.opened : "", "mainPad"].join(' ')}>
        <div>
          <Link className={styles.logo} to={"/"}>
            {this.props.data.site.siteMetadata.title}
          </Link>
          <button onClick={this.handleClick} aria-label="menu toggle"/>
        </div>
        <nav>
          <ul>
            {this.props.data.site.siteMetadata.menu.map(link => (
              <li>
                <Link to={link.slug}>{link.name}</Link>
              </li>
            ))}
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
