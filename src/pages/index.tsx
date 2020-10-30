import Layout from 'components/layout/Layout'
import React from 'react'
import {graphql, PageProps} from 'gatsby'
import Card from 'components/work/Card'
import {ScrollProvider} from 'hooks/useScroll'

export default function Index({data}: PageProps<GatsbyTypes.IndexPageQuery>) {
  const works = data.allMarkdownRemark.edges
  return (
    <Layout.Wrapper>
      <Layout.Main>
        <ScrollProvider count={data.allMarkdownRemark.totalCount}>
          {works.map(({node}: {node: any}, index: number) => (
            <Card node={node} key={node.id} index={index} />
          ))}
        </ScrollProvider>
      </Layout.Main>
    </Layout.Wrapper>
  )
}

export const query = graphql`
  query IndexPage {
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
            type
            image {
              childImageSharp {
                fixed(height: 360, cropFocus: CENTER) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`
