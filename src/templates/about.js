import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Reveal from "react-reveal/Reveal"
import { headerTextStyle, bodyStyle } from "./default.style"
import Img from "gatsby-image"
import { css } from "@emotion/core"
import parse from "html-react-parser"
import { useHoverListener } from "./default"

export default ({ data }) => {
  const post = data.markdownRemark
  const html = post.html.replace(/(\r\n|\n|\r)/gm, "")

  useHoverListener();

  return (
    <Layout>
      <SEO
        pathname="/about/"
      />
      <main css={(theme) => [bodyStyle(theme), aboutStyle(theme)]} className="u-pageContent">
        <Reveal effect="fadeInUp">
          <div className="aboutText">
            <h2>I'm Clay</h2>
            {parse(html)}
          </div>
        </Reveal>
      </main>
    </Layout>
  )
}

const aboutStyle = theme => css`
  .aboutText {
    h2 {
      font-size: 3.5rem;
      line-height: 1;
      margin: 0;
      padding-bottom: ${theme.pad * 2}px;
      margin-bottom: ${theme.pad * 2}px;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        width: 50px;
        left: 0%;
        height:8px;
        background-color: ${theme.colors.accent};
      }

      ${theme.mq.medium} {
        font-size: 4rem;
      }
    }
  }
`

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
    }
  }
`
