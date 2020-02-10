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
    ],
  },
  plugins: [
    `gatsby-plugin-emotion`,
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
      resolve: `gatsby-plugin-scroll-reveal`,
      options: {
          threshold: 0.1, // Percentage of an element's area that needs to be visible to launch animation
          once: true, // Defines if animation needs to be launched once
          disable: false, // Flag for disabling animations
          
          // Advanced Options
          selector: '[data-sal]', // Selector of the elements to be animated
          animateClassName: 'sal-animate', // Class name which triggers animation
          disabledClassName: 'sal-disabled', // Class name which defines the disabled state
          rootMargin: '0% 50%', // Corresponds to root's bounding box margin
          enterEventName: 'sal:in', // Enter event name
          exitEventName: 'sal:out', // Exit event name
      }
    },
    {
      resolve: "gatsby-plugin-use-dark-mode",
      options: {
        classNameDark: "dark-mode",
        classNameLight: "light-mode",
        storageKey: "darkMode",
        minify: true,
      },
    },
  ],
}
