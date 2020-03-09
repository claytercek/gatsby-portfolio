import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import rehypeReact from "rehype-react"
import Layout from "../components/layout"
import { css } from "@emotion/core"
import Fade from 'react-reveal/Fade';
import { headerTextStyle, bodyStyle } from "./default.style"
import parse from 'html-react-parser';

function PostInfo (props) {
  return(
    <table>
      {Object.keys(props.obj).map((val) => {
        if (!props.obj[val]) return; 
        
        return (
          <tr>
            <th>{val}</th>
            <td>{props.obj[val]}</td>
          </tr>)
      })}
    </table>
  )
}

export default ({ data }) => {
  const post = data.markdownRemark
  post.frontmatter.info.year = new Date(post.frontmatter.date).getFullYear();
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
        image {
          childImageSharp {
            fluid(maxWidth: 2048, maxHeight: 1280) {
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
