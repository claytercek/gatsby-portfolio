import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"
import { css } from "@emotion/core"

function GridItem(props) {
  const [loaded, setLoaded] = useState(false)
  return (
    <li {...props} css={itemStyle} className={loaded ? "loaded fadeInUp" : ""}>
      <Link to={props.slug}>
        <article>
          {props.image && (
            <Img
              fluid={props.image.childImageSharp.fluid}
              className="abs"
              onLoad={() => {
                setLoaded(true)
              }}
            />
          )}
          <div className="content abs">
            <h2>{props.title}</h2>
            <p>{props.excerpt}</p>
            <h3 className="u-underline-anim--active">view more</h3>
          </div>
        </article>
      </Link>
    </li>
  )
}

export default ({ data }) => {
  return (
    <Layout>
      <SEO pathname="/work/"/>
      <main>
        <ul css={listStyle}>
          {data.allMarkdownRemark.edges.map(({ node }, index) => {
            return (
              <GridItem
                title={node.frontmatter.title}
                image={node.frontmatter.image}
                excerpt={node.frontmatter.description || node.excerpt}
                slug={node.fields.slug}
                key={node.id}
                style={{ animationDelay: index * 100 + "ms" }}
              />
            )
          })}
        </ul>
      </main>
    </Layout>
  )
}

// styles

const listStyle = theme => css`
  list-style-type: none;
  margin: 0;
  padding: 0;
  > * {
    display: block;
  }

  grid-auto-flow: dense;

  ${theme.mq.medium} {
    display: grid;
    grid-gap: ${theme.pad}px;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 30vw;
  }

  ${theme.mq.large} {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 20vw;
  }
`

const itemStyle = theme => css`
  position: relative;

  opacity: 0;

  .gatsby-image-wrapper {
    height: 50vw;

    ${theme.mq.medium} {
      height: auto;
    }
  }

  .abs {
    ${theme.mq.medium} {
      position: absolute !important;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      z-index: -1;
    }
  }

  .content {
    margin-bottom: ${theme.pad / 2}px;
    font-size: 1rem;
    padding: ${theme.pad}px;

    ${theme.mq.medium} {
      padding: ${theme.pad * 1.5}px;
      font-size: 1rem;
      margin: 0;
      z-index: 0;
      background-color: ${theme.colors.accent};
      color: white;
      opacity: 0;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      line-height: 1;
      transition: opacity 0.3s ${theme.bezier};
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

    h3 {
      display: inline-block;
      position: relative;
      font-weight: 400;
      font-size: 1em;
      justify-self: flex-end;
      margin-bottom: 5px;
      margin-top: 0.7rem;
      letter-spacing: 0.06em;

      &::after {
        content: "";
        position: absolute;
        bottom: -4px;
        height: 1px;
        background-color: black;

        ${theme.mq.medium} {
          background-color: white;
        }
      }

      &::before {
        content: " +";
        position: absolute;
        top: 50%;
        right: -15%;
        transform: translateY(-50%);
      }
    }

    &:hover {
      opacity: 1;
    }
  }

  ${theme.mq.medium} {
    &:nth-child(5n-1) {
      grid-column: span 2;
      grid-row: span 2;
    }

    &:nth-child(5n-3),
    &:nth-child(6n) {
      grid-row: span 2;
    }
  }

  ${theme.mq.large} {
  }
`

// query

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { draft: { ne: true }, type: { eq: "work" } } }
    ) {
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
            description
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
