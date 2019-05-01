module.exports = {
  siteMetadata: {
    title: `Clay Tercek`,
    siteUrl: `https://claytercek.netlify.com`,
    description: `Clay Tercek's Personal Portfolio`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/content/`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-plugin-sass`,
  ],
}
