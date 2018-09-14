const webpack = require("webpack");
require("dotenv").config();

module.exports = {
  webpack: config => {
    config.plugins.push(new webpack.EnvironmentPlugin(process.env));
    return config;
  }
};

const withSass = require("@zeit/next-sass");
module.exports = withSass();

const withCSS = require("@zeit/next-css");
module.exports = withCSS();
