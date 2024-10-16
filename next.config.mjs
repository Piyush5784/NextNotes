/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.(mp3|wav)$/,
      use: {
        loader: "url-loader",
        options: {
          limit: 10000, // Converts files smaller than 10kb to base64 URIs
          publicPath: "/_next/static/songs",
          outputPath: "static/songs",
          name: "[name].[hash].[ext]",
        },
      },
    });

    return config;
  },
};

export default nextConfig;
