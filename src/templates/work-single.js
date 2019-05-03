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
        description={post.frontmatter.description || post.excerpt}
        image={"/" + post.frontmatter.image.relativePath}
        pathname={post.fields.slug}
        article
      />
      <div>
        <h1>{post.frontmatter.title}</h1>
        <h4>{post.frontmatter.datePublished}</h4>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
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
        description
        image {
          relativePath
        }
      }
      excerpt
      fields {
        slug
      }
    }
  }
`
