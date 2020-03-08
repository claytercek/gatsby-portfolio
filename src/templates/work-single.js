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
            <div css={headerTextStyle}>
              <h2>{post.frontmatter.title}</h2>
            </div>
            {post.frontmatter.image ? <Img className="imageWrapper" fluid={post.frontmatter.image.childImageSharp.fluid} /> : ""}
            <p>{post.frontmatter.description}</p>
            <PostInfo obj={post.frontmatter.info} />
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
        date
        title
        subtitle
        description
        info {
          role
          deliverable
          class
          client
        }
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
