module.exports = {
  siteMetadata: {
    title: `Clay Tercek`,
    description: `Interactive developer and designer based in Philadelphia, specializing in rich experiences in spaces both physical and digital.`,
    author: "Clay Tercek",
    siteUrl: "https://claytercek.com",
    image: "/default-thumb.png",
    twitterUsername: "@claytercek",
    keywords: [
      "development",
      "design",
      "web",
      "interface",
      "ui",
      "digital",
      "interactive",
    ],
    menu: [
      {
        name: "work",
        slug: "/",
      },
      {
        name: "journal",
        slug: "/journal/",
      },
      {
        name: "about",
        slug: "/about/",
      },
    ],
    social: [
      {
        name: "Mail",
        slug: "mailto:hello@claytercek.com",
      },
      {
        name: "GitHub",
        slug: "https://github.com/claytercek?tab=repositories",
      },
      {
        name: "LinkedIn",
        slug: "https://www.linkedin.com/in/claytercek/",
      },
      {
        name: "Twitter",
        slug: "https://twitter.com/claytercek",
      },
      {
        name: "Instagram",
        slug: "https://www.instagram.com/clay_tercek_art/?hl=en",
      },
    ],
  },
  plugins: [
    `gatsby-plugin-emotion`,
    `gatsby-plugin-netlify-cms`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static/assets`,
        name: "assets",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/content/`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-custom`,
          `gatsby-remark-external-links`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1440,
              wrapperStyle: fluidResult => `flex:${fluidResult.aspectRatio};`,
              linkImagesToOriginal: false,
              withWebp: true,
              quality: 80,
            },
          },
        ],
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-132200952-1",
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Clay Tercek`,
        short_name: `Clay Tercek`,
        icon: 'static/favicon.png',
        start_url: `/`,
        background_color: `#FFFFFF`,
        theme_color: `#2222FF`,
        display: `minimal-ui`,
      },
    },
  ],
}
