import React, {useEffect} from 'react'
import {graphql} from 'gatsby'

export default function Default({data}) {
  const post = data.markdownRemark
  const html = post.html.replace(/(\r\n|\n|\r)/gm, '')

  return (
    <div>
      <h2>{post.title}</h2>
    </div>
  )
}

export const query = graphql`
  query($slug: String!) {
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
            fixed(width: 1024, cropFocus: CENTER) {
              ...GatsbyImageSharpFixed
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
