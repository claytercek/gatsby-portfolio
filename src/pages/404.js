import SEO from 'utils/seo'
import React from 'react'

export default function NoMatch({data}) {
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
