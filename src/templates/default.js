import React from "react"
import { graphql } from "gatsby"
import rehypeReact from "rehype-react"
import Layout from "../components/layout"
import { css } from "@emotion/core"
import Fade from 'react-reveal/Fade';
import { headerTextStyle, bodyStyle } from "./default.style"
import parse from 'html-react-parser';

export default ({ data }) => {
  const post = data.markdownRemark

  const renderAst = new rehypeReact({
    createElement: React.createElement,
    Fragment: Fade,
  }).Compiler
  return (
    <Layout>
      <main css={bodyStyle} >
          <Fade bottom distance={"40px"}>
            {parse(post.html)}
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
        subtitle
        info {
          role
          deliverable
          class
          client
        }
      }
      excerpt
      fields {
        slug
      }
    }
  }
`
