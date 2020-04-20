/**
 * Enables dynamic routes for the following pages:
 * 1. /p - single post detail
 * 2. /search - search filters can be shared
 * 3. /app - parent for auth protected routes
 */


exports.onCreatePage = async ({ page, actions }) => {
    const { createPage } = actions

    const dynamicRoutes = [
        {
            routeMatchTestRegEx: /^\/p/,
            routeMatchPathRegEx: `/p/*`
        },
        {
            routeMatchTestRegEx: /^\/search/,
            routeMatchPathRegEx: `/search/*`
        },
        {
            routeMatchTestRegEx: /^\/app/,
            routeMatchPathRegEx: `/app/*`
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
