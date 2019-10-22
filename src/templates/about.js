import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/SEO"
import styles from "./about.module.scss"

export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.excerpt}
        pathname={post.fields.slug}
        article
      />
      <main className={[styles.wrapper, "mainContent"].join(" ")}>
        <h2 className={styles.header}>{post.frontmatter.title}</h2>
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.html }} />
        <ul className={styles.social}>
          {data.site.siteMetadata.social.map((node, index) => 
            <li key={index} className={styles.gridItem}>
              <Link to={node.slug}>
                {node.name}
              </Link>
            </li>
          )}
        </ul>
      </main>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 1024, maxHeight: 1024) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      excerpt
      fields {
        slug
      }
    }
    site {
      siteMetadata {
        social {
          name
          slug
        }
      }
    }
  }
`
