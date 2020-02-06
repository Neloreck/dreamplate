import { createTransformer } from "babel-jest";
import { BABEL_CONFIG } from "../../build/config/babel.config";

const CONFIG = {
  babelrc: false,
  presets: [
    "@babel/preset-env",
    "@babel/preset-typescript",
    "@babel/preset-react"
  ],
  plugins: [
    "@babel/plugin-transform-runtime",
    ...BABEL_CONFIG.plugins
  ]
};

/**
 * Custom transformer for jest tests with provided config.
 */
module.exports = createTransformer(CONFIG);
