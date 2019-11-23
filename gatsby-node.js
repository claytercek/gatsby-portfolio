const path = require(`path`)
var fs = require("fs")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    const type = slug.split("/")[1]
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
    createNodeField({
      node,
      name: `type`,
      value: type,
    })
  }
}

exports.createPages = ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  return graphql(`
  {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1000
    ) {
      edges {
        node {
          fields {
            slug
            type
          }
        }
      }
    }
  }
`).then(result => {
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      // pages/{type}/{type}-single.js
      let template = path.resolve(
        `./src/templates/${node.fields.type}-single.js`
      )

      // pages/{type}/{type}.js
      if (!fs.existsSync(template)) {
        template = path.resolve(`./src/templates/${node.fields.type}.js`)
      }

      // pages/default.js
      if (!fs.existsSync(template)) {
        template = path.resolve(`./src/templates/default.js`)
      }

      createPage({
        path: node.fields.slug,
        component: template,
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.fields.slug,
        },
      })
    })
  })
}