/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['three'],
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        });
        config.module.rules.push({
            test: /\.(glsl|vs|fs|vert|frag|ps)$/,
            exclude: /node_modules/,
            use: ["raw-loader", "glslify-loader"],
        });
        return config;
    },
};

export default nextConfig;
