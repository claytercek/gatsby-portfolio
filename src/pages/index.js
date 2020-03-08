import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"
import { css } from "@emotion/core"

function GridItem(props) {
  return (
    <li {...props} css={itemStyle}>
      <Link to={props.slug}>
        <article>
          <div className="content abs">
            <h2>{props.title}</h2>
          </div>
          {props.image && <Img fluid={props.image.childImageSharp.fluid} className="abs" /> }
        </article>
      </Link>
    </li>
  )
}


export default ({ data }) => {
  return (
    <Layout>
      <main>
        <ul css={listStyle}>
          {data.allMarkdownRemark.edges.map(({ node }, index) => {
            return (
              <GridItem
                title={node.frontmatter.title}
                image={node.frontmatter.image}
                slug={node.fields.slug}
                key={node.id}
              />
            )
          })}

          {data.allMarkdownRemark.edges.map(({ node }, index) => {
            return (
              <GridItem
                title={node.frontmatter.title}
                image={node.frontmatter.image}
                slug={node.fields.slug}
                key={node.id}
              />
            )
          })}
          {data.allMarkdownRemark.edges.map(({ node }, index) => {
            return (
              <GridItem
                title={node.frontmatter.title}
                image={node.frontmatter.image}
                slug={node.fields.slug}
                key={node.id}
              />
            )
          })}
          {data.allMarkdownRemark.edges.map(({ node }, index) => {
            return (
              <GridItem
                title={node.frontmatter.title}
                image={node.frontmatter.image}
                slug={node.fields.slug}
                key={node.id}
              />
            )
          })}
          {data.allMarkdownRemark.edges.map(({ node }, index) => {
            return (
              <GridItem
                title={node.frontmatter.title}
                image={node.frontmatter.image}
                slug={node.fields.slug}
                key={node.id}
              />
            )
          })}
          {data.allMarkdownRemark.edges.map(({ node }, index) => {
            return (
              <GridItem
                title={node.frontmatter.title}
                image={node.frontmatter.image}
                slug={node.fields.slug}
                key={node.id}
              />
            )
          })}
          {data.allMarkdownRemark.edges.map(({ node }, index) => {
            return (
              <GridItem
                title={node.frontmatter.title}
                image={node.frontmatter.image}
                slug={node.fields.slug}
                key={node.id}
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

  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-auto-rows: 40vw;
  grid-gap: ${theme.pad}px;
  grid-auto-flow: dense;

  ${theme.mq.medium} {
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

  .abs {
    position:absolute !important;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: -1;
  }

  .content {
    z-index: 0;
    background-color: ${theme.colors.accent};
    color: white;
    opacity: 0;
    padding: ${theme.pad}px;

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
      sort: { fields: [frontmatter___date], order: DESC },
      filter: {fields: {draft: {ne: true}, type: {eq: "work"}}}
    ) {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            subtitle
            image {
              childImageSharp {
                fluid(maxWidth: 1280, maxHeight: 1280) {
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