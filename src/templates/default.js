import React from "react"
import { graphql } from "gatsby"
import rehypeReact from "rehype-react"
import Layout from "../components/layout"
import Headline from "../components/headline"
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

  console.log(post.html);
  return (
    <Layout>
      <main css={bodyStyle} >
          <Fade bottom distance={"40px"}>
            <Headline css={headerTextStyle} title={post.frontmatter.title} subtitle={post.frontmatter.subtitle} />
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
      }
      excerpt
      fields {
        slug
      }
    }
  }
`
