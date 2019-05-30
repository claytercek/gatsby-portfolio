import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/SEO"

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
      <main>
        <h1>{post.frontmatter.title}</h1>
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
        title
      }
      excerpt
      fields {
        slug
      }
    }
  }
`
