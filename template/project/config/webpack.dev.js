const paths = require("./path");

const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    historyApiFallback: true,
    contentBase: paths.dist,
    open: true,
    compress: true,
    hot: true,
    port: 8080,
    overlay: {
      errors: true,
    },
    https: true,
    stats: {
      colors: true,
    },
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
