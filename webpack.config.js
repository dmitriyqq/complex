const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const outputPath = path.resolve(__dirname, "./dist");

module.exports = {
  entry: path.resolve(__dirname, "./src/index.js"),
  mode: "development",
  output: {
    path: path.resolve(__dirname, outputPath),
    filename: "main.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: [path.resolve(__dirname, "src")],
        enforce: "post",
        loader: "babel-loader",
        options: {
          presets: ["env", "react"]
        }
      },

      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        enforce: "pre",
        use: "eslint-loader"
      },

      {
        test: /\.(html)$/,
        exclude: /node_modules/,
        use: {
          loader: "html-loader",
          options: {
            attrs: [":data-src"]
          }
        }
      }
    ]
  },

  resolve: {
    alias: {
      Curves: path.resolve(__dirname, "./src/Curves"),
      Lib: path.resolve(__dirname, "./src/Lib"),
      Model: path.resolve(__dirname, "./src/Model"),
      UI: path.resolve(__dirname, "./src/UI"),
      Components: path.resolve(__dirname, "./src/UI/Components")
    },

    modules: ["node_modules", path.resolve(__dirname, "app")],

    extensions: [".js", ".json", ".jsx", ".css"]
  },

  context: __dirname,

  target: "web",

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "./src/assets/index.html"),
      filename: "index.html",
      title: "Chat",
      path: outputPath
    })
  ],

  devServer: {
    contentBase: path.resolve(__dirname, "./dist"),
    port: 8080,
    historyApiFallback: true,
    inline: true,
    hot: true,
    host: "0.0.0.0",
    disableHostCheck: true
  }
  /* Advanced configuration (click to show) */
};
