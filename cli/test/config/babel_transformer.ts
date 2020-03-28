import { createTransformer } from "babel-jest";
import { BABEL_CONFIG } from "../../build/config/babel.config";

const CONFIG = {
  ...BABEL_CONFIG,
  plugins: [
    ...BABEL_CONFIG.plugins
      .filter((it) =>
        typeof it === "string"
          ? it !== "@babel/plugin-transform-runtime"
          : it[0] !== "@babel/plugin-transform-runtime"
      )
  ]
};

/**
 * Custom transformer for jest tests with provided config.
 */
module.exports = createTransformer(CONFIG);
