import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Headline from "../components/Headline"
import styles from "./index.module.scss"
import SEO from "../components/SEO"
import Img from "gatsby-image"

export default ({ data }) => {
  return (
    <Layout>
      <SEO />
      <main className={"mainContent"}>
        <Headline>
          <h3 className={styles.headline}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            explicabo veritatis asperiores? Voluptatibus a reprehenderit
            doloremque accusamus.
          </h3>
        </Headline>
        <div className={styles.gridWrapper}>
          {data.allMarkdownRemark.edges.map(({ node }) => (
            <Link to={node.fields.slug} key={node.id} className={styles.gridItem}>
              <Img className={styles.gridItem__image} fluid={node.frontmatter.image.childImageSharp.fluid} />
              <h3 className={styles.gridItem__title}>{node.frontmatter.title}</h3>
              <h4 className={styles.gridItem__sub}>{node.frontmatter.subtitle}</h4>
            </Link>
          ))}
        </div>
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
            subtitle
            image {
              childImageSharp {
                fluid(maxWidth: 1024, maxHeight: 1024) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          excerpt
        }
      }
    }
  }
`
