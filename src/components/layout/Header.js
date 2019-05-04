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
      <h3>{data.site.siteMetadata.title}</h3>
      <div>
        <nav>
          <ul>
            {data.site.siteMetadata.menu.map( link => 
              <li>
                <Link to={link.slug}>{link.name}</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}
