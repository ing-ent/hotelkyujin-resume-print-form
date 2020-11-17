'use strict';
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const version = require('./version.json');

const src = '/src/js/',
  dest = './dist';

module.exports = {
  entry: {
    [`assets/js/resume_print.${version.js.resume_print}`]: path.join(__dirname, src + '/index.tsx'),
  },
  output: {
    path: path.join(__dirname, dest),
    publicPath: dest,
    filename: '[name].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  target: ['web', 'es5'],
  devServer: {
    port: 3004,
    watchContentBase: true,
    open: false,
    inline: true,
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'dist/assets/js'),
    proxy: {
      '/': {
        target: 'http://localhost:3001',
      },
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      PUBLIC_ACCESS_TOKEN: JSON.stringify(process.env.PUBLIC_ACCESS_TOKEN),
      API_SERVER: JSON.stringify(process.env.API_SERVER),
      CLIENT_ID: JSON.stringify(process.env.CLIENT_ID),
      CLIENT_SECRET: JSON.stringify(process.env.CLIENT_SECRET),
    })
  ]
};
