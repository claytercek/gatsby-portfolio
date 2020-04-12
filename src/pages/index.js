import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"
import { css } from "@emotion/core"
import { addHoverClass } from "../components/utils"

function GridItem(props) {
  const [loaded, setLoaded] = useState(false)
  return (
    <li {...props} css={itemStyle} className={(loaded ? "loaded fadeInUp " : "") + props.className}>
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
            <h3 // eslint-disable-line jsx-a11y/no-noninteractive-element-interactions
              className="u-underline-anim--active"
              onMouseOver={addHoverClass}
              onFocus={addHoverClass}
            >
              view more
            </h3>
          </div>
        </article>
      </Link>
    </li>
  )
}

export default ({ data }) => {

  // logic so that the more recent items 
  // appear at the top of each column on desktop

  var items_split_3 = [[], [], []];
  var last_index_in_row = [ 0, 0, 0 ];
  for (var index in data.allMarkdownRemark.edges) {
    let el = data.allMarkdownRemark.edges[index];
    el.listIndex = index;
    items_split_3[index % 3].push(el);
    last_index_in_row[index % 3] = index;
  }

  items_split_3 = [].concat(...items_split_3);

  return (
    <Layout>
      <SEO pathname="/" />
      <main>
        <ul css={listStyle}>
            {items_split_3.map(({node, listIndex}, index) => {
              return (
                <GridItem
                  title={node.frontmatter.title}
                  image={node.frontmatter.image}
                  excerpt={node.frontmatter.description || node.excerpt}
                  slug={node.fields.slug}
                  key={node.id}
                  className={last_index_in_row.includes(listIndex) ? "break" : ""}
                  style={{
                    order: listIndex,
                    animationDelay: parseInt(listIndex) * 100 + "ms" 
                  }}
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

  display: flex;
  flex-direction: column;

  ${theme.mq.large} {
    display: block;
    columns: 3;
  }
`

const itemStyle = theme => css`
  position: relative;
  display: block;
  opacity: 0;
  margin: 0;

  .gatsby-image-wrapper {
    height: 50vw;

    ${theme.mq.large} {
      height: auto;
      min-height: 20vw;
      display: block;
    }
  }

  a:active {
    .gatsby-image-wrapper {
      opacity: 0.8;
    }
  }

  ${theme.mq.large} {
    display: inline-block !important;
    margin: 0;
    padding: 0;
    background-color: red;
    width: 100%;
    margin-bottom: ${theme.pad}px;
    break-after: avoid;
    break-inside: avoid-column;
  }

  &.break {
    break-after:column !important;
    display:block !important;
  }

  .content {
    margin-bottom: ${theme.pad / 2}px;
    font-size: 1rem;
    padding: ${theme.pad}px;

    ${theme.mq.large} {
      position: absolute !important;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;

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
      transition: opacity 0.3s ${theme.bezier}, background-color 0.3s ease;

      &:active {
        transition: background-color 0.1s ease;
        background-color: ${theme.colors.accentDim};
      }
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

        ${theme.mq.large} {
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
                fluid(maxWidth: 800, cropFocus: CENTER) {
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
