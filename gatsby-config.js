module.exports = {
  siteMetadata: {
    title: `Clay Tercek`,
    siteUrl: `https://claytercek.netlify.com`,
    description: `Clay Tercek's Personal Portfolio`,
    titleTemplate: "%s · Clay Tercek",
    url: "http://claytercek.netlify.com", // No trailing slash allowed!
    image: "/images/default_image.jpg", // Path to your image you placed in the 'static' folder
    twitterUsername: "@claytercek",
    menu: [
      {
        name: "home",
        slug: "/",
      },
      {
        name: "blog",
        slug: "/blog/",
      },
      {
        name: "about",
        slug: "/about/",
      },
    ],
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/content/`,
      },
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1440,
              linkImagesToOriginal: false,
              withWebp: true,
              quality: 80
            },
          },
          // "gatsby-remark-component",
        ],
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-sass-resources`,
      options: {
        resources: ["./src/styles/global.scss"],
      },
    },
    `gatsby-plugin-react-helmet`,
  ],
}
