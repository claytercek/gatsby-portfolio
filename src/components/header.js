import { Link, StaticQuery } from "gatsby"
import React, {Component} from "react"

const headerStyle = (theme) => ({
  writingMode: "vertical-lr",
  transform: "rotate(-180deg)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "fixed",
  top: 0,
  left: 0,
  bottom: 0,
  width: "inherit",
  backgroundColor: "#F88"
})

const headerWrapper = (theme) => ({
  width: 40,
  [theme.mq.small]: {
    width: 60,
  },
  [theme.mq.medium]: {
    width: 80,
  },
  position: "relative"
})

class Header extends Component {
  render() {
    var data = this.props.data.site.siteMetadata;
    return (
    <div css={headerWrapper}>
      <header css={headerStyle}>
        <h1>{data.title}</h1>
        <nav>
          <ul>
            {data.menu.map((link, index) => {
              return (
                <li>
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
