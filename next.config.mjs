/** @type {import('next').NextConfig} */
import emoji from "remark-emoji";
import nextMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
const isProd = process.env.NODE_ENV === "production";
const withMDX = nextMDX({
    options: {
        // If you use remark-gfm, you'll need to use next.config.mjs
        // as the package is ESM only
        // https://github.com/remarkjs/remark-gfm#install
        remarkPlugins: [emoji, remarkGfm],
        rehypePlugins: [],
        // If you use `MDXProvider`, uncomment the following line.
        providerImportSource: "@mdx-js/react",
    },
});
export default withMDX({
    images: { unoptimized: true },
    pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
    reactStrictMode: false,
    trailingSlash: true,
    // output: "standalone",
    // target: "serverless",
    webpack: (config, { isServer, webpack }) => {
        // Fixes npm packages that depend on `fs` module
        if (!isServer) {
            // config.node = { fs: 'empty' };
            config.resolve.fallback.fs = false;
            config.resolve.fallback.electron = false;
        }
        config.plugins.push(
            new webpack.IgnorePlugin({
                resourceRegExp: /^electron$/,
            })
        );

        return config;
    },
    experimental: {
        externalDir: true,
        esmExternals: false,
    },
});
