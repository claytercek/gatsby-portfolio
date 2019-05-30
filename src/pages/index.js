import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import styles from "./index.module.scss"
import SEO from "../components/SEO"

export default ({ data }) => {
  var foo = Array(20).fill(0)
  return (
    <Layout>
      <SEO />
      <main className={[styles.gridWrapper, "mainContent"].join(" ")}>
        {/* {data.allMarkdownRemark.edges.map(({ node }) => (
          <Link to={node.fields.slug} key={node.id}>
            <h3>
              {node.frontmatter.title} <span> — {node.frontmatter.date}</span>
            </h3>
            <p>{node.excerpt}</p>
          </Link>
        ))} */}

        {foo.map((item, index) => (
          <div className={styles.gridItem}>{index}</div>
        ))}
      </main>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(filter: { fields: { type: { eq: "work" } } }) {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          excerpt
        }
      }
    }
  }
`
