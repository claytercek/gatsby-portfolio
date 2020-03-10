import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { css } from "@emotion/core"
import Img from "gatsby-image";

const listStyle = theme => css`
  list-style-type: none;
  padding: 0;
  padding-left: ${theme.pad}px;
`

function JournalItem(props) {
  return (
    <li {...props}>
      <Link to={props.slug}>
        <article>
          {props.image && <Img fluid={props.image.childImageSharp.fluid} className="abs" /> }
          <div className="content abs">
            <h2>{props.title}</h2>
            <p>{props.excerpt}</p>
            <h4>{props.category}</h4>
            <h3>read more +</h3>
          </div>
        </article>
      </Link>
    </li>
  )
}

export default ({ data }) => {
  return (
    <Layout>
      <SEO />
      <main className={"mainContent"}>
        <ul css={listStyle}>
          {data.allMarkdownRemark.edges.map(({ node }, index) => {
            let i = (1 + index).toString().padStart(2, "0")
            return (
              <JournalItem 
                title={node.frontmatter.title}
                image={node.frontmatter.image}
                category={node.frontmatter.category}
                excerpt={node.excerpt}
                slug={node.fields.slug}
              />
            )
          })}
        </ul>
      </main>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(filter: { fields: { type: { eq: "journal" } } }) {
      totalCount
      edges {
        node {
          id
          excerpt(pruneLength: 100)
          fields {
            slug
          }
          frontmatter {
            title
            date
            category
            image {
              childImageSharp {
                fluid(maxWidth: 800, maxHeight: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
