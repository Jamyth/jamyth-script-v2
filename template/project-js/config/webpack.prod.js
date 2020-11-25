const paths = require("./path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const CSSMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  devtool: false,
  output: {
    path: paths.dist,
    publicPath: "/",
    filename: "js/[name].[contenthash].js",
  },
  plugins: [
    new MiniCSSExtractPlugin({
      filename: "styles/[name].[contenthash].css",
      chunkFilename: "styles/chunk-[id].css",
    }),
  ],
  bail: true,
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCSSExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              sourceMap: false,
            },
          },
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new CSSMinimizerPlugin(), "..."],
    runtimeChunk: {
      name: "runtime",
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});
