/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */


exports.onCreatePage = async ({ page, actions }) => {
    const { createPage } = actions

    const dynamicRoutes = [
        {
            routeMatchTestRegEx: /^\/mobile\/p/,
            routeMatchPathRegEx: "/mobile/p/*"
        },
        {
            routeMatchTestRegEx: /^\/mobile\/search/,
            routeMatchPathRegEx: "/mobile/search/*"
        },
    ]

    dynamicRoutes.forEach((e) => {
        if (page.path.match(e.routeMatchTestRegEx)) {
            page.matchPath = e.routeMatchPathRegEx
            // Update the page.
            createPage(page)
        }
    })

}
