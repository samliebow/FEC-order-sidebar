const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    //'react-hot-loader/patch', // what is this doing exactly?
    path.resolve('client', 'src', 'order-sidebar.jsx'),
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/public/',
    filename: 'bundle.js',
  },
  watch: true,
  devtool: 'inline-source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Check for this type of file
        include: [path.resolve(__dirname, 'client', 'src')], // In this directory
        loader: 'babel-loader', // Use this loader (npm package)
        options: {
          presets: [['react'], ['env', { displayErrorDetails: true }]],
        }, // Pass in these arguments to the loader
      },
    ],
  },
  // plugins: [new webpack.HotModuleReplacementPlugin()],
};
