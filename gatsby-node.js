const path = await require(`path`)
const fs = await require('fs')
const {createFilePath} = await require(`gatsby-source-filesystem`)

exports.onCreateNode = ({node, getNode, actions}) => {
  const {createNodeField} = actions

  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({node, getNode, basePath: `pages`})
    const type = slug.split('/')[1]
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

    createNodeField({
      node,
      name: `draft`,
      value:
        process.env.NODE_ENV === 'production' ? node.frontmatter.draft : false,
    })
  }
}

exports.createPages = ({actions, graphql}) => {
  const {createPage} = actions
  return graphql(`
    {
      allMarkdownRemark(
        sort: {fields: [frontmatter___date], order: DESC}
        filter: {fields: {draft: {ne: true}}}
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
    const posts = result.data.allMarkdownRemark.edges

    posts.forEach(({node}) => {
      // pages/{type}/{type}-single.js
      let template = path.resolve(
        `./src/templates/${node.fields.type}-single.tsx`,
      )

      // pages/{type}/{type}.js
      if (!fs.existsSync(template)) {
        template = path.resolve(`./src/templates/${node.fields.type}.tsx`)
      }

      // pages/default.js
      if (!fs.existsSync(template)) {
        template = path.resolve(`./src/templates/default.tsx`)
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

// absolute imports
exports.onCreateWebpackConfig = ({stage, actions}) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  })
}
