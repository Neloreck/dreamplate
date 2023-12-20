import * as path from "path";

import { DEV_SERVER_REFRESH, IS_PRODUCTION, IS_TEST } from "#/build/config/webpack.constants";

/**
 * Babel configuration for project codebase.
 */
export const BABEL_CONFIG = {
  babelrc: false,
  minified: IS_PRODUCTION && !IS_TEST,
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: ["> 2.0%", "not dead"],
        },
      },
    ],
    "@babel/preset-typescript",
    ["@babel/preset-react", { runtime: "automatic" }],
  ],
  plugins: [
    "@babel/plugin-transform-runtime",
    [
      "module-resolver",
      {
        alias: {
          "#": path.resolve(__dirname, "../.."),
        },
      },
    ],
    "macros",
    "@babel/plugin-transform-react-constant-elements",
    "@babel/plugin-proposal-class-properties",
    ["@babel/plugin-proposal-decorators", { decoratorsBeforeExport: true }],
  ].concat(DEV_SERVER_REFRESH ? ["react-refresh/babel"] : []),
};
