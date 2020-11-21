const path = require("path");

module.exports = {
  // enntry file
  entry: ["@babel/polyfill", "./src/index.js"],
  // 컴파일 + 번들링된 js 파일이 저장될 경로와 이름 지정
  output: {
    filename: "snowy.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "var",
    library: "SnowJS",
  },
  module: {
    rules: [
      {
        include: [path.resolve(__dirname, "src")],
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
    ],
  },
  devtool: "source-map",
  // https://webpack.js.org/concepts/mode/#mode-development
  mode: "development",
};
