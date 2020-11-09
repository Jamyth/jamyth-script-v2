const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: ["./node_modules/regenerator-runtime/runtime.js", "./src/index.jsx"],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "static/js/[name].[hash].js",
  },
  resolve: {
    extensions: [".jsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
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
