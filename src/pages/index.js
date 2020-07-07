import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"
import { css } from "@emotion/core"
import { addHoverClass } from "../components/utils"
import Masonry from 'react-masonry-css'
import Filter from '../components/filter'

function GridItem(props) {
  const [loaded, setLoaded] = useState(false)
  return (
    <Link to={props.slug} {...props} css={itemStyle} className={(loaded ? "loaded fadeInUp " : "") + props.className}>
      <article>
        {props.image && (
          <Img
            fluid={props.image.childImageSharp.fluid}
            onLoad={() => {
              setLoaded(true)
            }}
          />
        )}
        <div className="content">
          <h2>{props.title}</h2>
          <p>{props.excerpt}</p>
          <ul className="tags">
            {props.tags.map(tag => (
              <li>{tag}</li>
            ))}
          </ul>
          {/* <h3 // eslint-disable-line jsx-a11y/no-noninteractive-element-interactions
            className="u-underline-anim--active"
            onMouseOver={addHoverClass}
            onFocus={addHoverClass}
          >
            view more
          </h3> */}
        </div>
      </article>
    </Link>
  )
}

const breakpointColumnsObj = {
  default: 3,
  1080: 2,
  768: 1,
};

export default ({ data }) => {

  const [activeTag, setTag] = useState(-1);

  const hasTags = (arr) => {
    switch (activeTag) {
      case -1:
        return true;
      case 0:
        return arr.includes("experiment");
      case 1:
        return arr.includes("client");
      case 2:
        return !arr.includes("experiment") && !arr.includes("client");
      default:
        return true;
    }
  };
  
  const nodes = data.allMarkdownRemark.edges.filter(({node}) => {
    return hasTags(node.frontmatter.tags);
  })

  

  return (
    <Layout>
      <SEO pathname="/" />
      <main>
        <Filter 
          allTags={["experiment", "client", "project"]} 
          setTag={(index) => setTag(index)} 
          activeTag={activeTag} />
        <Masonry
          breakpointCols={breakpointColumnsObj}
          role="list"
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
          css={listStyle}>
            {nodes.map(({node}, index) => {
              return (
                <GridItem
                  role="listitem"
                  title={node.frontmatter.title}
                  image={node.frontmatter.image}
                  excerpt={node.excerpt}
                  slug={node.fields.slug}
                  tags={node.frontmatter.tags}
                  key={node.id}
                  style={{
                    animationDelay: parseInt(index) * 100 + "ms" 
                  }}
                />
              )
            })}
        </Masonry>
      </main>
    </Layout>
  )
}

const allFalse = function(obj) { 
  for (var i in obj) {
      if (obj[i] === true) return false;
  }
  return true;
}

// styles

const listStyle = theme => css`
  list-style-type: none;
  margin: 0;
  padding: 0;

  display: flex;
  flex-direction: row;
  margin-left: -${theme.pad}px; /* gutter size offset */

  .my-masonry-grid_column {
    padding-left: ${theme.pad}px; /* gutter size */
    background-clip: padding-box;
  }
`

const itemStyle = theme => css`
  position: relative;
  display: block;
  opacity: 0;
  margin: 0;

  .gatsby-image-wrapper {
    height: 50vw;

    ${theme.mq.medium} {
      height: auto;
      display: block;
      min-height: calc(300px - 5vw);
    }
  }

  &:active {
    .gatsby-image-wrapper {
      opacity: 0.8;
    }
  }

  ${theme.mq.medium} {
    display: inline-block !important;
    margin: 0;
    padding: 0;
    width: 100%;
    margin-bottom: ${theme.pad}px;
    break-after: avoid;
    break-inside: avoid;
  }

  .content {
    margin-bottom: ${theme.pad / 2}px;
    font-size: 1rem;
    padding: ${theme.pad}px;

    ${theme.mq.medium} {
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

    .tags {
      display: flex;
      flex: 1;
      flex-wrap: wrap;
      list-style-type: none;
      padding: 0;
      margin: 0;
      margin-top: ${theme.pad}px;
      max-width: 80%;
      font-size: 1rem;
      align-items: flex-start;
      align-content: flex-start;

      li {
        line-height: 1;
        display: block;
        background: ${theme.colors.accentLight};
        color: ${theme.colors.accent};
        padding: ${theme.pad / 2}px ${theme.pad}px;
        border-radius: 50px;
        margin-right: ${theme.pad / 2}px;
        margin-bottom: ${theme.pad / 2}px;
        font-weight: 400;

        ${theme.mq.medium} {
          background: ${theme.colors.bg};
          color: ${theme.colors.accent};
        }
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
            tags
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
