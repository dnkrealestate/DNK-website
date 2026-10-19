/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'dnkserver.com',
                pathname: '/**',
            },
            {
                // Kept for legacy image URLs already hardcoded in old DB
                // content (e.g. news articles) that still point here.
                protocol: 'https',
                hostname: 'api.dnkre.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'd1k91sbs9n9dpy.cloudfront.net',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8800',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'drive.google.com',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3000',
                pathname: '/**',
            },
        ],
    },

    async redirects() {
        return [
            {
                // Page renamed from /damac-islands-new-community to
                // /damac-islands — preserve SEO equity and any existing
                // links/ad campaigns pointing at the old URL.
                source: '/damac-islands-new-community',
                destination: '/damac-islands',
                permanent: true,
            },
        ];
    },

    webpack: (config, { dev, isServer }) => {
        if (dev && !isServer) {
            config.resolve.symlinks = false;
        }

        return config;
    },
     // ✅ Generate production source maps
    productionBrowserSourceMaps: true,


    // ✅ Updated: Turbopack moved out of experimental
    turbopack: {
        rules: { '*.mdx': ['mdx-loader'] },
    },

    // other experimental flags
    experimental: {
        workerThreads: false,
        cpus: 1,
    },
};

module.exports = nextConfig;
