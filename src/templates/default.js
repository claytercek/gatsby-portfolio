import React from "react"
import { graphql } from "gatsby"
import rehypeReact from "rehype-react"
import SafeImg from "../components/SafeImg"
import Layout from "../components/layout"
import Headline from "../components/headline"
import { css } from "@emotion/core"

const headerTextStyle = theme => css`
  ${'' /* margin-left: ${theme.pad * 2}px; */}
  height: calc(72vh - ${theme.pad * 2}px);
  flex-direction:column;
  justify-content: flex-end;

  padding-bottom: 40px;
  padding-right: 15%;
  margin-bottom: 0;


  h2 {
    font-size: 3rem;
  }

  h3 {
    font-size: 1.2rem;
    margin-top: ${theme.pad}px;
  }

  ${theme.mq.small} {
    h2 {
    font-size: 3.8rem;
    }

    h3 {
      font-size: 1.6rem;
    }
  }

  ${theme.mq.medium} {
    padding-bottom: 0px;

    h2 {
    font-size: 6rem;
    }

    h3 {
      font-size: 1.8rem;
    }
  }

`

const bodyStyle = theme => css`
  line-height: 1.6;
  font-size: 1.1rem;
  font-weight: 400;
  padding-bottom: ${theme.space * 2}px;

  > * {
    margin-bottom: 0;
  }

  p, ul {
    max-width: 60ch;
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
    padding-left: 5vw;
    padding-bottom: ${theme.space * 3}px;
    font-size: 1.4rem;

    p, ul, > h3  {
      margin-top: ${theme.space * 3}px;

      + p, + ul {
        margin-top: ${theme.space * 1.5}px;
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
        {/* <SafeImg css={headerImgStyle} fluid={post.frontmatter.image.childImageSharp.fluid} alt={post.frontmatter.title}/> */}
        <Headline css={headerTextStyle} title={post.frontmatter.title} subtitle={post.frontmatter.type} />
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
