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
            {data}
            {/* {data.allMarkdownRemark.edges.map(({ node }) => (
              <li key={node.id} >
                <Link >
                  <Img  fluid={node.frontmatter.image.childImageSharp.fluid} />
                  <h3 >{node.frontmatter.title}</h3>
                  <h4 >{node.frontmatter.subtitle}</h4>
                </Link>
              </li>
            ))} */}
          </ul>
        </main>
      </Layout>
    )
  }
  
  export const query = graphql`
    query {
      allMarkdownRemark {
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