const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

const isProduction = process.env.NODE_ENV === "production";
const repoName = "AIBY-test";

module.exports = {
  mode: isProduction ? "production" : "development",
  entry: "./js/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
    assetModuleFilename: "assets/[hash][ext][query]",
    publicPath: isProduction ? `/${repoName}/` : "/",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|svg|gif|webp)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/img/[hash][ext][query]",
        },
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.json$/,
        type: "asset/resource",
        generator: {
          filename: "assets/data/[name][ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "assets/lang", to: "assets/lang" }],
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 3000,
    open: true,
  },
};
