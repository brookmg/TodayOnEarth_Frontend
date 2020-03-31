module.exports = {
  siteMetadata: {
    title: `Today on Earth`,
    description: `Frontend website for TOE API(https://github.com/brookmg/TodayOnEarth_Backend/)`,
    author: `@abeltesfaye`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `ToE-Frontend`,
        short_name: `ToE`,
        start_url: `/`,
        background_color: `#387bfe`,
        theme_color: `#387bfe`,
        display: `minimal-ui`,
        icon: `src/images/toe-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/*`],
      },
    },
    `gatsby-plugin-transition-link`,
    `gatsby-plugin-styled-components`
  ],
}
