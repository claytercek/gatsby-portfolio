import React, { useEffect } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Reveal from "react-reveal/Reveal"
import { headerTextStyle, bodyStyle } from "./default.style"
import Img from "gatsby-image"
import parse from "html-react-parser"
import { addHoverClass } from "../components/utils"

export default ({ data }) => {
  const post = data.markdownRemark
  const html = post.html.replace(/(\r\n|\n|\r)/gm, "")

  useHoverListener()
  
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
            {post.frontmatter.tags && 
              <ul className="tags">
                {post.frontmatter.tags.map((tag) => (
                  <li>{tag}</li>
                ))}
              </ul>
            }
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

export const useHoverListener = () => {
  useEffect(() => {
    var links = document.querySelectorAll(".u-pageContent a")

    links.forEach(link => {
      link.addEventListener("mouseover", addHoverClass)
    })
    return () =>
      links.forEach(link => {
        link.removeEventListener("mouseover", addHoverClass)
      })
  })
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        category
        description
        tags
        image {
          childImageSharp {
            fluid(maxWidth: 2048, maxHeight: 1280, quality: 100, cropFocus: CENTER) {
              ...GatsbyImageSharpFluid
            }
            fixed(width: 1024, cropFocus: CENTER) {
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
