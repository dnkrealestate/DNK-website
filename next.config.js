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
        config.optimization.splitChunks = false;

        if (dev && !isServer) {
            config.resolve.symlinks = false;
        }

        return config;
    },

    // ✅ Updated: Turbopack moved out of experimental
    turbopack: {
        rules: { '*.mdx': ['mdx-loader'] },
    },

    // Keeping other experimental flags (they are still valid)
    experimental: {
        workerThreads: false,
        cpus: 1,
    },
};

module.exports = nextConfig;
