const path = require('path');

module.exports = {
  entry: {
    bundle: path.join(__dirname, 'client', 'src', 'render.jsx'),
    app: path.join(__dirname, 'client', 'src', 'OrderSidebar.jsx'),
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js',
  },
  watch: true,
  devtool: 'source-map',
  mode: 'development',
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json'],
  },
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
      {
        test: /\.css$/,
        loaders: [
          'style-loader?sourceMap',
          'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
        ],
      },
    ],
  },
};
