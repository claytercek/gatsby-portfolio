import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/SEO"
import styles from "./about.module.scss"
import Img from "gatsby-image"

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
      <main className={styles.wrapper}>
        <Img className={styles.img} fluid={post.frontmatter.image.childImageSharp.fluid} alt="headshot"/>
        <div className={styles.textWrapper}>
          <h1 className={styles.header}>{post.frontmatter.title}</h1>
          <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
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
  }
`
