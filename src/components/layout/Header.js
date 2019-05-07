import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

export default () => {
  const data = useStaticQuery(
    graphql`
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
    `
  )
  return (
    <header>
      <Link to={"/"}>{data.site.siteMetadata.title}</Link>
      <div>
        <nav>
          <ul>
            {data.site.siteMetadata.menu.map(link => (
              <li>
                <Link to={link.slug}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
