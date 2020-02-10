import React from "react"
import { graphql } from "gatsby"
import rehypeReact from "rehype-react"
import Layout from "../components/layout"
import Headline from "../components/headline"
import { css } from "@emotion/core"
import { headerTextStyle, bodyStyle } from "./default.style"

export default ({ data }) => {
  const post = data.markdownRemark

  const renderAst = new rehypeReact({
    createElement: React.createElement,
    Fragment: React.Fragment,
  }).Compiler

  return (
    <Layout>
      <main css={bodyStyle} >
          <Headline css={headerTextStyle} title={post.frontmatter.title} subtitle={post.frontmatter.subtitle} />
          {renderAst(post.htmlAst)}
      </main>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      htmlAst
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
