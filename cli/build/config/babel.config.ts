import * as path from "path";

import { IS_PRODUCTION, IS_TEST } from "./webpack.constants";

export const BABEL_CONFIG = {
  babelrc: false,
  minified: IS_PRODUCTION && !IS_TEST,
  presets: [
    [
      "@babel/preset-env",
      {
        "targets": {
          "node": "10",
          "browsers": [
            "> 5.0%",
            "not dead"
          ]
        },
        "modules": false,
        "loose": true,
        "useBuiltIns": "entry",
        "corejs": "3",
        "exclude": [ "transform-async-to-generator", "transform-regenerator" ]
      }
    ],
    "@babel/preset-typescript",
    "@babel/preset-react"
  ],
  plugins: [
    [
      "module-resolver",
      {
        "alias": {
          "@Macro": path.resolve(__dirname,"../macroses")
        }
      }
    ],
    "macros",
    "react-hot-loader/babel",
    [ "@babel/plugin-proposal-decorators", { "decoratorsBeforeExport": true } ],
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 3,
        "regenerator": false,
        "useESModules": true,
        "version": "7.9.2"
      }
    ],
    "@babel/plugin-transform-react-constant-elements",
    [ "@babel/plugin-proposal-class-properties", { "loose": true } ],
    [ "module:fast-async", { "spec": true } ],
    [ "transform-imports", {
      /* Example:
      "@material-ui/core": {
        "transform": "@material-ui/core/${member}",
        "preventFullImport": true
      }*/
    } ]
  ]
};
