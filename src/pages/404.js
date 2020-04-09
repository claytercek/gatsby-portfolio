import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data }) => {
  return (
    <Layout>
      <SEO title="404" />
      <main>
        <h4>error 404</h4>
      </main>
    </Layout>
  )
}
