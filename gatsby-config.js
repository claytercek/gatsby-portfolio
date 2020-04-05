module.exports = {
  siteMetadata: {
    title: `Clay Tercek`,
    description: `Clay Tercek's Personal Portfolio`,
    author: "Clay Tercek",
    url: "https://claytercek.com",
    image: "/default-thumb.png",
    twitterUsername: "@claytercek",
    keywords: [
      'development', 
      'design', 
      'web', 
      'interface', 
      'ui', 
      'digital', 
      'interactive'
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
      // {
      //   name: "about",
      //   slug: "/about/",
      // },
    ],
    social: [
      {
        name: "GitHub",
        slug: "#",
      },
      {
        name: "Instagram",
        slug: "#",
      },
      {
        name: "LinkedIn",
        slug: "#",
      },
      {
        name: "Twitter",
        slug: "#",
      },
      {
        name: "Email",
        slug: "#",
      },
    ],
  },
  plugins: [
    `gatsby-plugin-emotion`,
    `gatsby-plugin-netlify-cms`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/content/`,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-custom`,
          "gatsby-remark-copy-linked-files",
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
    {
      resolve: "gatsby-plugin-use-dark-mode",
      options: {
        classNameDark: "dark-mode",
        classNameLight: "light-mode",
        storageKey: "darkMode",
        minify: true,
      },
    },
    `gatsby-plugin-catch-links`
  ],
}
