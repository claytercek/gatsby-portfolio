import React from "react"
import { graphql } from "gatsby"
import rehypeReact from "rehype-react"
import Layout from "../components/layout"
import { css } from "@emotion/core"
import Fade from 'react-reveal/Fade';
import { headerTextStyle, bodyStyle } from "./default.style"
import Img from "gatsby-image";
import parse from 'html-react-parser';

export default ({ data }) => {
  const post = data.markdownRemark;
  const html = post.html.replace(/(\r\n|\n|\r)/gm, "");
  return (
    <Layout>
      <main css={bodyStyle} >
        <Fade bottom distance={"40px"}>
          <h2 css={headerTextStyle}>{post.frontmatter.title}</h2>
          <div className="imageWrapper" style={{display: "block"}}>
            <Img fluid={post.frontmatter.image.childImageSharp.fluid}/>
          </div>
          {parse(html)}
        </Fade>
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
            fluid(maxWidth: 2048, maxHeight: 1280, quality: 100) {
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
