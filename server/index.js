const express = require('express');
const webpack = require('webpack');
const path = require('path');
const config = require('../webpack.config.js');
const middleware = require('webpack-dev-middleware');

const app = express();
const port = process.env.PORT || 541;
const compiler = webpack(config);

app.use(middleware(compiler, {
  // hot: true,
  publicPath: config.output.publicPath,
}));

// app.use(express.static(path.resolve(__dirname, '../public')));

app.listen(port, () => console.log(`Server running on ${port}...`));