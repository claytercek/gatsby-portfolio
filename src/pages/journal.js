import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { css } from "@emotion/core"
import Img from "gatsby-image"

function JournalItem(props) {
  const [loaded, setLoaded] = useState(true)
  return (
    <li
      {...props}
      css={articleStyle}
      className={loaded ? "loaded fadeInUp" : ""}
    >
      <Link to={props.slug}>
        <article>
          <div className="image">
            {props.image && (
              <Img
                fluid={props.image.childImageSharp.fluid}
                onLoad={() => {
                  setLoaded(true)
                }}
              />
            )}
          </div>
          <div className="text">
            <h2>{props.title}</h2>
            <p>{props.excerpt}</p>
            <p className="date">{props.date}</p>
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
      <SEO title="journal" pathname="/journal/" />
      <main className={"mainContent"}>
        <ul css={listStyle}>
          {data.allMarkdownRemark.edges.map(({ node }, index) => {
            // let i = (1 + index).toString().padStart(2, "0")
            return (
              <JournalItem
                title={node.frontmatter.title}
                image={node.frontmatter.image}
                category={node.frontmatter.category}
                excerpt={node.excerpt}
                slug={node.fields.slug}
                date={node.frontmatter.date}
              />
            )
          })}
        </ul>
      </main>
    </Layout>
  )
}

const articleStyle = theme => css`
  opacity: 0;

  margin-bottom: ${theme.pad}px;
  ${theme.mq.large} {
    margin-bottom: ${theme.pad * 3}px;
  }

  article {
    .image,
    .text {
      width: 100%;
      ${theme.mq.medium} {
        width: 50%;
      }
    }

    :hover {
      .image {
        .gatsby-image-wrapper {
          ${theme.mq.medium} {
            width: 105%;
            height: 105%;
          }
        }
      }
    }

    :active {
      .image {
        .gatsby-image-wrapper {
          opacity: 0.8;
          transition: opacity 0.1s ${theme.bezier};
        }
      }
    }

    .image {
      position: relative;
      overflow: hidden;

      .gatsby-image-wrapper {
        display: inline-block;
        width: 100%;
        height: 100%;

        ${theme.mq.medium} {
          transition: width 0.3s ${theme.bezier}, height 0.3s ${theme.bezier};
          transform: translate(-50%, -50%);
          top: 50%;
          left: 50%;
          position: absolute !important;
        }
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


      .date {
        display: block;
        background-color: ${theme.colors.bg};
        position: absolute;
        top: ${theme.pad * 2}px;
        left: -5px;
        margin: 0;
        padding: ${theme.pad}px;
        /* border: 1px solid ${theme.colors.accent}; */
        box-shadow: 5px 5px ${theme.colors.accent};
      }
      
      h4 {
        order: 0;
        font-weight: 700;
        font-size: 90%;
        letter-spacing: 0.05rem;
        margin-bottom: 0.75rem;
        margin-top: 0.5rem;
        text-transform: uppercase;
        color: ${theme.colors.accent};
      }
    }

    ${theme.mq.medium} {
      display: flex;

      .image {
      }

      .text {
        padding: ${theme.pad * 3}px;

        h2 {
          margin-bottom: 1em;
        }

        h4 {
          margin-top: 0;
          margin-bottom: 1.2em;
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
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { type: { eq: "journal" } } }) {
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
            date(formatString: "MMMM DD YYYY")
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
