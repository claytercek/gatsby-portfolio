import Layout from 'components/layout/Layout'
import React from 'react'
import {graphql} from 'gatsby'
import Card from 'components/Work/Card'
import {ScrollProvider} from 'components/hooks/useScroll'

export default function Index({data}) {
  const works = data.allMarkdownRemark.edges
  return (
    <Layout.Wrapper>
      <Layout.Main>
        <ScrollProvider count={data.allMarkdownRemark.totalCount}>
          {works.map(({node}, index) => (
            <Card node={node} key={node.id} index={index} />
          ))}
        </ScrollProvider>
      </Layout.Main>
    </Layout.Wrapper>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC}
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
