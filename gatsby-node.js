const path = require(`path`)

exports.createPages = ({graphql, actions}) => {
  const {createPage} = actions

  return new Promise((resolve) => {
    graphql(`
      {
        allDatoCmsWork {
          edges {
            node {
              slug
            }
          }
        }
      }
    `).then(result => {
      result.data.allDatoCmsWork.edges.map(({node: work}) => {
        return createPage({
          path: `work/${work.slug}`,
          component: path.resolve(`src/templates/work.js`),
          context: {
            slug: work.slug,
          },
        })
      })
      resolve()
    })
  })
}
