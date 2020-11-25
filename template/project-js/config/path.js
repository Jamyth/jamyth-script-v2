const path = require("path");

module.exports = {
  src: path.resolve(__dirname, "../src"),
  dist: path.resolve(__dirname, "../dist"),
  static: path.resolve(__dirname, "../static"),
  module: path.resolve(__dirname, "../src/module/"),
  asset: path.resolve(__dirname, "../src/asset/"),
  component: path.resolve(__dirname, "../src/component/"),
  util: path.resolve(__dirname, "../src/util/"),
};
