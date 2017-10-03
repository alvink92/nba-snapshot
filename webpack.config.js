var path = require("path");
// var webpack = require("webpack");

module.exports = {
  context: path.resolve(__dirname),
  entry: "./lib/main.js",
  output: {
    path: path.resolve(__dirname),
    filename: "./lib/bundle.js"
  },
  module: {
    loaders: [
      {
        test: [/\.js?$/],
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["es2015"]
        }
      }
    ]
  },
  devtool: "source-maps",
  resolve: {
    extensions: [".js", "*"]
  }

  // plugins: [
  //   new webpack.DefinePlugin({
  //     "process.env": {
  //       NODE_ENV: JSON.stringify("production")
  //     }
  //   }),
  //   new webpack.optimize.UglifyJsPlugin({
  //     compress: {
  //       warnings: true
  //     }
  //   })
  // ]
};
