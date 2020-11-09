const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "static/js/[name].[hash].js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      module: path.resolve(__dirname, "src/module"),
      component: path.resolve(__dirname, "src/component"),
      asset: path.resolve(__dirname, "src/asset"),
      util: path.resolve(__dirname, "src/util"),
    },
  },
  module: {
    rules: [
      {
        test: /.tsx?$/,
        loader: "ts-loader",
        exclude: "/node_modules/",
      },
      {
        enforce: "pre",
        test: /.js$/,
        loader: "source-map-loader",
      },
      {
        test: /.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
        sideEffects: true,
      },
      {
        test: /.(png|jpg|jepg|gif|svg|woff|swoff2|ttf)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024,
              esModule: false,
              fallback: {
                loader: "file-loader",
                options: {
                  name: "static/asset/[name].[hash:8].[ext]",
                  esModule: false,
                },
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: "./static/index.html",
    }),
  ],
  devtool: "source-map",
};
