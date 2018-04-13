const express = require('express');
const webpack = require('webpack');
const config = require('../webpack.config.js');
const WebpackDevServer = require('webpack-dev-server');
const path = require('path');

const compiler = webpack(config);
const port = process.env.PORT || 541;

const app = new WebpackDevServer(compiler, {
  publicPath: config.output.path,
  hot: true,
});

app.listen(port, () => console.log(`Server running on ${port}...`));
