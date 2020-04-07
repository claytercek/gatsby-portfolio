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
        pathname="/about/"
      />
      <main css={bodyStyle} className="u-pageContent">
        <Reveal effect="fadeInUp">
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
    }
  }
`
