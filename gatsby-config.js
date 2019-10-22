module.exports = {
  siteMetadata: {
    title: `Clay Tercek`,
    siteUrl: `https://claytercek.netlify.com`,
    description: `Clay Tercek's Personal Portfolio`,
    titleTemplate: "%s · Clay Tercek",
    url: "http://claytercek.netlify.com", 
    image: "/images/default_image.jpg", 
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
        name: `src`,
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
