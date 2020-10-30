import React, {useEffect} from 'react'
import {graphql, PageProps} from 'gatsby'
import Layout from 'components/layout/Layout'

export default function Default({
  data,
}: PageProps<GatsbyTypes.DefaultTemplateQuery>) {
  const post = data.markdownRemark
  const html = post?.html?.replace(/(\r\n|\n|\r)/gm, '')

  return (
    <Layout.Wrapper>
      <Layout.Main>
        <h1>{post?.frontmatter?.title}</h1>
      </Layout.Main>
    </Layout.Wrapper>
  )
}

export const query = graphql`
  query DefaultTemplate($slug: String!) {
    markdownRemark(fields: {slug: {eq: $slug}}) {
      html
      frontmatter {
        title
        category
        description
        tags
        image {
          childImageSharp {
            fluid(
              maxWidth: 2048
              maxHeight: 1280
              quality: 100
              cropFocus: CENTER
            ) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      excerpt
      fields {
        slug
        type
      }
    }
  }
`
