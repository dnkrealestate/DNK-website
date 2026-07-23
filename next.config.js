/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.dnkre.com',
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

    webpack: (config, { dev, isServer }) => {
        if (dev) {
            // Disabling chunk splitting was applying in production too, forcing
            // every page's bundle to carry its own copy of shared dependencies
            // instead of sharing one common chunk (Lighthouse: "Duplicated
            // JavaScript", "Reduce unused JavaScript"). Scoped to dev-only here,
            // matching the symlinks workaround below, so production keeps
            // webpack's default (and much smaller) chunk splitting.
            config.optimization.splitChunks = false;
        }

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
