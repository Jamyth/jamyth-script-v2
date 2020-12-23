const paths = require("./path");
const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const CopyWebpackPlugin = require("copy-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: [`${paths.src}/index.tsx`],
  output: {
    path: paths.dist,
    filename: `[name].[contenthash].js`,
    publicPath: "/",
    assetModuleFilename: "images/[name].[contenthash][ext][query]",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      module: paths.module,
      component: paths.component,
      asset: paths.asset,
      util: path.resolve(__dirname, "../src/util"),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: paths.static,
    //       to: "assets",
    //       globOptions: {
    //         ignore: ["*.DS_Store", "index.html"],
    //       },
    //     },
    //   ],
    // }),
    new HTMLWebpackPlugin({
      title: "Jamyth Page",
      favicon: `${paths.src}/asset/images/favicon.ico`,
      template: `${paths.static}/index.html`,
      filename: "index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [require.resolve("react-refresh/babel")],
          },
        },
        exclude: "/node_modules/",
      },
      { test: /\.tsx?$/, loader: "ts-loader", exclude: "/node_modules/" },
      {
        enforce: "pre",
        test: /.js$/,
        loader: "source-map-loader",
      },
      {
        test: /\.(scss|css)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { sourceMap: true, importLoaders: 1 },
          },
          { loader: "postcss-loader", options: { sourceMap: true } },
          { loader: "sass-loader", options: { sourceMap: true } },
        ],
      },
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: "asset/resource" },
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: "asset/inline" },
    ],
  },
};
