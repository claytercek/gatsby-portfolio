import React from 'react'
import Helmet from 'react-helmet'
import {useStaticQuery, graphql} from 'gatsby'

interface Props {
  description?: string
  lang?: string
  meta?: Array<
    {property: string; content: string} | {property: string; content: string}
  >
  image?: {src: string; width: number; height: number}
  title?: string
  pathname?: string
}

function SEO({
  description,
  lang,
  meta,
  image: metaImage,
  title,
  pathname,
}: Props) {
  const {site} = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            keywords
            siteUrl
            image
            twitterUsername
          }
        }
      }
    `,
  )

  const metaDescription = description || site.siteMetadata.description

  const image = {
    src: metaImage ? metaImage.src : site.siteMetadata.image,
    width: metaImage ? metaImage.width : 1024, // known width of default image
    height: metaImage ? metaImage.height : 512, // known height of default image
  }

  const canonical = pathname ? `${site.siteMetadata.siteUrl}${pathname}` : null

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      defaultTitle={site.siteMetadata.title}
      link={
        canonical
          ? [
              {
                rel: 'canonical',
                href: canonical,
              },
            ]
          : []
      }
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: 'author',
          content: site.siteMetadata.author,
        },
        {
          name: 'keywords',
          content: site.siteMetadata.keywords.join(','),
        },
        {
          property: `og:title`,
          content: title || site.siteMetadata.title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.twitterUsername,
        },
        {
          name: `twitter:title`,
          content: title || site.siteMetadata.title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ]
        .concat([
          {
            property: 'og:image',
            content: `${site.siteMetadata.siteUrl}${image.src}`,
          },
          {
            property: 'og:image:width',
            content: image.width,
          },
          {
            property: 'og:image:height',
            content: image.height,
          },
          {
            name: 'twitter:card',
            content: 'summary_large_image',
          },
          {
            name: 'twitter:image',
            content: `${site.siteMetadata.siteUrl}${image.src}`,
          },
        ])
        .concat(meta ?? [])}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

export default SEO
