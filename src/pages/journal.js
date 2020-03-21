import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { css } from "@emotion/core"
import Img from "gatsby-image";


function JournalItem(props) {
  return (
    <li {...props} css={articleStyle}>
      <Link to={props.slug}>
        <article>
          <div className="image">
            {props.image && <Img fluid={props.image.childImageSharp.fluid} /> }
          </div>
          <div className="text">
            <h2>{props.title}</h2>
            <p>{props.excerpt}</p>
            <h4>{props.category}</h4>
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

const articleStyle = theme => css`
  margin-bottom: ${theme.pad}px;
  ${theme.mq.large} { 
    margin-bottom: ${theme.pad * 3}px;
    border: 1px solid #aaa;
  }

  article {

    .image, .text {
      flex: 50%;
    }

    .image {
      min-height: 300px;

      .gatsby-image-wrapper {
        width: 100%;
        height: 100%;
      }
    }

    .text {
      padding: ${theme.pad}px;
      display: flex;
      flex-direction: column;

      > * {
        margin: 0;
        order: 1;
      }

      h2 {
        margin-top: 0;
        margin-bottom: 0.5rem;
        font-size: 1.5em;
      }

      p {
        line-height: 1.5;
        font-size: 1rem;
        margin: 0;
        flex: 1;
        font-size: 1em;
        letter-spacing: 0.06em;
      }

      h4 {
        order: 0;
        font-weight: 400;
        font-size: 90%;
        margin-bottom: 0.75rem;
        margin-top: 0.5rem;
        text-transform: uppercase;
      }
    }

    ${theme.mq.large} {
      display: flex;
      .text {
        padding: ${theme.pad * 3}px;
        
        h2 {
          margin-bottom: 1em;
        }

        h4 {
          margin-top: 0;
          margin-bottom: 1.5rem;
        }
      }
    }
  }
`
const listStyle = theme => css`
  list-style-type: none;
  padding: 0;
`

export const query = graphql`
  query {
    allMarkdownRemark(filter: { fields: { type: { eq: "journal" } } }) {
      totalCount
      edges {
        node {
          id
          excerpt(pruneLength: 200)
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
