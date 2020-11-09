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
        <Layout.Hero>
          <h2 css={{fontSize: '5rem', fontWeight: 800}}>
            interaction designer & creative developer.
          </h2>
        </Layout.Hero>
        <ScrollProvider count={data.allMarkdownRemark.totalCount}>
          {works.map(({node}, index: number) => (
            <Card
              date={node?.frontmatter?.date}
              title={node?.frontmatter?.title ?? ''}
              image={node?.frontmatter?.image}
              slug={node?.fields?.slug ?? ''}
              key={node.id}
              index={index}
            />
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
            date
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
