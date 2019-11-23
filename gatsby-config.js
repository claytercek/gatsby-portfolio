module.exports = {
  siteMetadata: {
    title: `Clay Tercek`,
    siteUrl: `https://claytercek.com`,
    description: `Clay Tercek's Personal Portfolio`,
    titleTemplate: "%s · Clay Tercek",
    url: "https://claytercek.com", 
    image: "/images/default_image.jpg", 
    twitterUsername: "@claytercek",
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
    ]
  },
  plugins: [
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
          "gatsby-remark-copy-linked-files",
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1440,
              linkImagesToOriginal: false,
              withWebp: true,
              quality: 80
            },
          },
        ],
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-use-dark-mode`,
  ],
}