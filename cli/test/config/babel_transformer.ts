import { default as babelJest } from "babel-jest";

import { BABEL_CONFIG } from "../../build/config/babel.config";

const CONFIG = {
  ...BABEL_CONFIG,
  plugins: [
    // Exclude ES modules configured runtime transform plugin and supply it with default params.
    ...BABEL_CONFIG.plugins.filter((it: any) =>
      typeof it === "string" ? it !== "@babel/plugin-transform-runtime" : it[0] !== "@babel/plugin-transform-runtime"),
    "@babel/plugin-transform-runtime",
  ],
};

/**
 * Custom transformer for jest tests with provided config.
 */
module.exports = babelJest.createTransformer!(CONFIG);
