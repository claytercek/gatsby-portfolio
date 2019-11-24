import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Headline from "../components/headline"
import { css } from "@emotion/core"

const listStyle = theme => css`
  list-style-type: none;
  margin: 0;
  padding: 0;
  > * {
    display: block;
  }

  ${theme.mq.medium} {
    display: flex;
    flex-flow: row wrap;
  }
`

const itemStyle = theme => css`
  align-items: center;
  display: flex;
  margin-bottom: ${theme.pad}px;

  ${theme.mq.medium} {
    margin-bottom: ${theme.pad}px;

    &:nth-child(9n-8),
    &:nth-child(9n-4) {
      flex-grow: 1;
      &::after {
        margin-right: ${theme.pad}px;
      }
    }

    &:nth-child(9n-6),
    &:nth-child(9n),
    &:nth-child(9n-2) {
      flex-basis: 100%;
    }

    &:nth-child(9n-8),
    &:nth-child(9n-4),
    &:nth-child(9n-6),
    &:nth-child(9n),
    &:nth-child(9n-2) {
      ::after {
        content: "";
        border-bottom: ${theme.lineWidth} solid ${theme.colors.primary};
        margin-left: ${theme.pad}px;
        flex: 1;
      }
    }

    &:nth-child(9n-5),
    &:nth-child(9n-1) {
      flex-basis: 100%;
      ::before {
        content: "";
        border-bottom: ${theme.lineWidth} solid ${theme.colors.primary};
        margin-right: ${theme.pad}px;
        flex: 1;
      }
    }
  }
`

const dividerStyle = theme => css`
  border-bottom: ${theme.lineWidth} solid ${theme.colors.primary};
  background: red;
  flex-grow: 1;
`

const breakAfter = theme => css`
  flex-basis: 100%;
`

const Divider = () => <li css={dividerStyle} />

export default ({ data }) => {
  return (
    <Layout>
      <SEO />
      <main className={"mainContent"}>
        <ul css={listStyle}>
          {data.allMarkdownRemark.edges.map(({ node }, index) => {
            let i = (1 + index).toString().padStart(2, "0")
            return (
              <>
                <li key={node.id} css={itemStyle}>
                  <Link to={node.fields.slug}>
                    <Headline
                      title={node.frontmatter.title}
                      subtitle={i + " " + node.frontmatter.type}
                    />
                  </Link>
                </li>
              </>
            )
          })}
        </ul>
      </main>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(filter: { fields: { type: { eq: "work" } } }) {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            type
          }
        }
      }
    }
  }
`
