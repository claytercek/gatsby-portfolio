import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import styles from "./header.module.scss"

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
      <div>
        <Link className={styles.logo} to={"/"}>
          {data.site.siteMetadata.title}
        </Link>
        <button />
      </div>
      <nav>
        <ul>
          {data.site.siteMetadata.menu.map(link => (
            <li>
              <Link to={link.slug}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
