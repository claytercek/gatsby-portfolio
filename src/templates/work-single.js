import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Headline from "../components/Headline"
import SEO from "../components/SEO"
import styles from "./work-single.module.scss"

export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        image={"/" + post.frontmatter.image.relativePath}
        pathname={post.fields.slug}
        article
      />
      <main className={"mainContent"}>
        <Headline>
          <h1 className={styles.title}>{post.frontmatter.title}</h1>
          <h2 className={styles.subtitle}>{post.frontmatter.subtitle}</h2>
        </Headline>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </main>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        datePublished: date(formatString: "MM YYYY")
        title
        subtitle
        image {
          relativePath
        }
      }
      fields {
        slug
      }
    }
  }
`
