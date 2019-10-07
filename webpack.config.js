const webpack = require("webpack");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require("autoprefixer");

const clientConfig = {
  entry: "./src/client/index.js",
  output: {
    path: __dirname,
    filename: "./public/bundle.js"
  },
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: "file-loader",
        options: {
          name: "public/media/[name].[ext]",
          publicPath: url => url.replace(/public/, "")
        }
      },
      {
        test: /\.*css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: { importLoaders: 2 }
          },
          {
            loader: "postcss-loader",
            options: { plugins: [autoprefixer()] }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "public/css/[name].css"
    })
  ]
};

const serverConfig = {
  entry: "./src/server/index.js",
  target: "node",
  output: {
    path: __dirname,
    filename: "server.js",
    libraryTarget: "commonjs2"
  },
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: "file-loader",
        options: {
          name: "public/media/[name].[ext]",
          publicPath: url => url.replace(/public/, ""),
          emit: false
        }
      },
      {
        test: /\.*css$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              onlyLocals: true,
            },
          },
          'sass-loader'
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: "babel-loader"
      }
    ]
  }
};

module.exports = [clientConfig, serverConfig];
