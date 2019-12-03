import React from "react"
import { graphql } from "gatsby"
import rehypeReact from "rehype-react"
import SafeImg from "../components/SafeImg"
import Layout from "../components/layout"
import Headline from "../components/headline"
import { css } from "@emotion/core"

const headerImgStyle = theme => css`
  max-height: 75vh;
`
const headerTextStyle = theme => css`
  ${theme.mq.medium} {
    justify-content: flex-start;
    flex-wrap: wrap;
    overflow: hidden;
    ::after {
      width: 100%;
      content:"";
      break-before: always;
      flex: 1;
      border-bottom: ${theme.colors.primary} solid ${theme.lineWidth};
      margin-left: ${theme.pad}px;
      transform: translateY(-2.4vw);
    }

    margin-top: ${theme.space * 2}px;

    ${theme.mq.medium} {
      margin-top: ${theme.space * 3}px;
    }
  }
`

const bodyStyle = theme => css`
  line-height: 1.6;
  font-size: 1rem;
  font-weight: 300;
  padding-bottom: ${theme.space * 2}px;

  > * {
    margin-bottom: 0;
  }

  p, ul {
    max-width: 60ch;
    margin-left: auto;
    margin-right: auto;
    margin-top: ${theme.space}px;
  }

  p a {
    position: relative;
    display: inline-block;
    font-weight: 400;
    ::after {
      content:"";
      position: absolute;
      height: ${theme.lineWidth};
      width:100%;
      left:0;
      bottom: 0;
      background: ${theme.colors.primary};
      transition: height ${theme.bezier} 0.2s;
    }

    &:hover::after {
      height: 6px;
    }
  }

  .linksOnly a {
    padding-bottom: 0.5em;
    margin-right: ${theme.pad}px;
  }

  ul {

    list-style-position: inside;
    padding-left: 0;
    list-style-type: none;
    li::before {
      content:"– "
    }
  }

  > h3 {
    margin-top: ${theme.space * 2}px;
    text-transform: uppercase;
    font-size: 1.6rem;
  }

  ${theme.mq.medium} {
    padding-bottom: ${theme.space * 3}px;
    font-size: 1.4rem;

    p, ul {
      margin-top: ${theme.space * 3}px;

      + p, + ul {
        margin-top: ${theme.space * 1.5}px;
      }
    }

    > h3 {
      margin-right: 0 !important;
      margin-top: ${theme.space * 5}px;
      display: flex;
      flex-flow: row nowrap;
      line-height: 1;
      font-size: 2.4rem;
      position: relative;
      z-index: 10;
      margin-right: 0;

      ::before, ::after {
        content: "";
        display: block;
        border-bottom: ${theme.colors.primary} solid ${theme.lineWidth};
        position: relative;
        bottom: 1.2rem;
      }
      
      ::after {
        margin-left: ${theme.pad}px;
        flex: 1000;
        max-width: 60vw;
      },

      ::before {
        flex-basis: 10vw;
        flex: 1;
        min-width: 30px;
        margin-right: ${theme.pad}px;
      }
    }
  }

  ${theme.mq.large} {

    p, ul {
      margin-top: ${theme.space * 4}px;

      + p, + ul {
        margin-top: ${theme.space * 2}px;
      }
    }

    > h3 {
      font-size: 3rem;

      ::before, ::after {
        bottom: 1.5rem;
      }
    }
  }
`

export default ({ data }) => {
  const post = data.markdownRemark

  const renderAst = new rehypeReact({
    createElement: React.createElement,
    Fragment: React.Fragment,
  }).Compiler

  console.log(post.htmlAst);

  return (
    <Layout>
      <main css={bodyStyle}>
        <SafeImg css={headerImgStyle} fluid={post.frontmatter.image.childImageSharp.fluid} alt={post.frontmatter.title}/>
          <Headline css={headerTextStyle} title={post.frontmatter.title} subtitle={post.frontmatter.type}/>
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
        type
        image {
          childImageSharp {
            fluid(maxWidth: 2160, maxHeight: 1600) {
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
