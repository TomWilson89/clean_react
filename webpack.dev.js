const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const { EnvironmentPlugin } = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  devtool: 'inline-source-map',
  devServer: {
    devMiddleware: {
      writeToDisk: true,
    },
    static: {
      directory: './public',
    },
    historyApiFallback: true,
    port: 3000,
  },
  plugins: [
    new EnvironmentPlugin({
      API_URL: 'https://fordevs.herokuapp.com/api',
    }),
    new HtmlWebPackPlugin({
      template: './template.dev.html',
    }),
  ],
});
