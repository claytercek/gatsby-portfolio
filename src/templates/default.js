import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Reveal from "react-reveal/Reveal"
import { headerTextStyle, bodyStyle } from "./default.style"
import Img from "gatsby-image"
import parse from "html-react-parser"

export default ({ data }) => {
  const post = data.markdownRemark
  const html = post.html.replace(/(\r\n|\n|\r)/gm, "")
  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        pathname={post.fields.slug}
        image={
          post.frontmatter.image
            ? {
                src: post.frontmatter.image.childImageSharp.fixed.src,
                height: post.frontmatter.image.childImageSharp.fixed.height,
                width: 1024,
              }
            : null
        }
      />
      <main css={bodyStyle} className="u-pageContent">
        <Reveal effect="fadeInUp">
          <div css={headerTextStyle}>
            {post.frontmatter.category && <h3>{post.frontmatter.category}</h3>}
            <h2>{post.frontmatter.title}</h2>
          </div>
          <div className="imageWrapper" style={{ display: "block" }}>
            <Img fluid={post.frontmatter.image.childImageSharp.fluid} />
          </div>
          {parse(html)}
        </Reveal>
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
        category
        description
        image {
          childImageSharp {
            fluid(maxWidth: 2048, maxHeight: 1280, quality: 100) {
              ...GatsbyImageSharpFluid
            }
            fixed(width: 1024) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
      excerpt
      fields {
        slug
        type
      }
    }
  }
`
