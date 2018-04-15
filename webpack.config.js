const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'client', 'src', 'OrderSidebar.jsx'),
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  watch: true,
  devtool: 'source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Check for this type of file
        include: [path.resolve(__dirname, 'client', 'src')], // In this directory
        loader: 'babel-loader', // Use this loader (npm package)
        options: {
          presets: [['react'], ['env', {displayErrorDetails: true}]],
        }, // Pass in these arguments to the loader
      },
    ],
  },
};
