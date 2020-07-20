import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Reveal from "react-reveal/Reveal"
import { bodyStyle } from "./default.style"
import { css } from "@emotion/core"
import parse from "html-react-parser"
import { useHoverListener } from "./default"
import Image from "gatsby-image"
import Form from "../components/form"

export default ({ data }) => {
  const post = data.markdownRemark
  const html = post.html.replace(/(\r\n|\n|\r)/gm, "")

  useHoverListener()

  return (
    <Layout style={{paddingBottom: 0}}>
      <SEO pathname="/info/" />
      <main
        css={theme => [bodyStyle(theme), infoStyle(theme)]}
        className="u-pageContent"
      >
        <Reveal effect="fadeInUp">
          <div className="aboutImage">
            <Image fluid={post.frontmatter.image.childImageSharp.fluid}/>
          </div>
          <div className="aboutText">
            <h2>I'm Clay</h2>
            {parse(html)}
          </div>
          <Form style="flex-basis: 100%"/>
        </Reveal>
      </main>
    </Layout>
  )
}

const infoStyle = theme => css`
  ${theme.mq.medium} {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-items: center;
    margin-top: ${theme.pad * 3}px;
    > div:nth-child(3) {
      flex-basis: 100%;
    }
  }

  > div:nth-child(3) {
    margin-bottom: 0;
  }

  .aboutImage {
    flex: 1;
    max-width: 22.5rem;
    /* min-width: 20rem; */
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 3rem;
    ${theme.mq.medium} {
      margin-right: ${theme.pad * 3}px;
    }
  }
  .aboutText {
    flex: 1;
    max-width: 45rem;
    h2 {
      font-size: 3rem;
      ${theme.mq.medium} {
        font-size: 3.5rem;
      }
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
        height: 8px;
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
      frontmatter {
        image {
          childImageSharp {
            fluid(maxWidth: 1024, quality: 100, cropFocus: CENTER) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
