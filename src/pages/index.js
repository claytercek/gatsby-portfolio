import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"


export default ({ data }) => {
    return (
      <Layout>
        <SEO />
        <main className={"mainContent"}>
          <ul>
            {data.allMarkdownRemark.edges.map(({ node }) => (
              <li key={node.id} >
                <Link to={node.fields.slug}>
                  <h3 >{node.frontmatter.title}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </main>
      </Layout>
    )
  }
  
  export const query = graphql`
    query {
        allMarkdownRemark(filter: {
            fields: {type: {eq: "work"}}
        }) {
        totalCount
        edges {
            node {
            id
            fields {
                slug
            }
            frontmatter {
                title
            }
            }
        }
        }
    }  
  `