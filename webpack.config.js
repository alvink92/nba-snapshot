var path = require("path");
var webpack = require("webpack");

module.exports = {
  context: __dirname,
  entry: "./lib/main.js",
  output: {
    path: path.resolve(__dirname),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["es2015", "react"]
        }
      }
    ]
  },
  devtool: "source-maps",
  resolve: {
    extensions: [".js", ".jsx", "*"]
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true
      }
    })
  ]
};
