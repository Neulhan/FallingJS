const path = require("path");

module.exports = {
  // enntry file
  entry: ["./lib/index.js"],
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "module",
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
