/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
    generateRobotsTxt: true,
    robotsTxtOptions: {
        includeNonIndexSitemaps: true,
    },
    generateIndexSitemap: false,
    transform: (config, path) => {
        return {
            loc: path.endsWith("/") ? path : path + "/", // => this will be exported as http(s)://<config.siteUrl>/<path>
            changefreq: config.changefreq,
            priority: config.priority,
            lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
            alternateRefs: config.alternateRefs ?? [],
        };
    },
};
