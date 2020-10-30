import SEO from 'utils/seo'
import React from 'react'
import {PageProps} from 'gatsby'

export default function NoMatch({data}: PageProps) {
  return (
    <div>
      <SEO title="404" />
      <main>
        <h4>error 404</h4>
      </main>
    </div>
  )
}

NoMatch.displayName = '404'
