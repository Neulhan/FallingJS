const path = require("path");
const packageJson = require("./package.json");

module.exports = {
  // enntry file
  entry: ["./lib/index.js"],
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "module",
    publicPath: `https://cdn.jsdelivr.net/npm/fallingjs@${packageJson.version}/dist/`,
  },
  module: {
    rules: [
      {
        include: [path.resolve(__dirname, "lib")],
        exclude: /node_modules/,
      },
    ],
  },
  devtool: "source-map",
  // https://webpack.js.org/concepts/mode/#mode-development
  mode: "development",
  experiments: {
    asyncWebAssembly: true,
    outputModule: true,
  },
};
