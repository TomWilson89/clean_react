const { EnvironmentPlugin } = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
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
            loader: MiniCssExtractPlugin.loader,
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
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    axios: 'axios',
    recoil: 'Recoil',
    'react-router-dom': 'ReactRouterDOM',
  },
  plugins: [
    new EnvironmentPlugin({
      API_URL: 'https://fordevs.herokuapp.com/api',
    }),
    new HtmlWebPackPlugin({
      template: './template.prod.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'main-bundle-[hash].css',
    }),
    new FaviconsWebpackPlugin({
      logo: './public/favicon.png',
    }),
  ],
});
