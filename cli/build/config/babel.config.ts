import * as path from "path";

import { IS_PRODUCTION, IS_TEST } from "./webpack.constants";
import * as packageConfig from "../../../package.json";

export const BABEL_CONFIG = {
  babelrc: false,
  minified: IS_PRODUCTION && !IS_TEST,
  presets: [
    [
      "@babel/preset-env",
      {
        "targets": {
          "browsers": [
            "> 5.0%",
            "not dead"
          ]
        }
      }
    ],
    "@babel/preset-typescript",
    "@babel/preset-react"
  ],
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        "useESModules": true,
        "version": packageConfig.devDependencies["@babel/plugin-transform-runtime"]
      }
    ],
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
    "@babel/plugin-transform-react-constant-elements",
    [ "@babel/plugin-proposal-decorators", { "decoratorsBeforeExport": true } ],
    [ "@babel/plugin-proposal-class-properties", { "loose": true } ],
    // Minify lit-elements html/css tags.
    [
      "template-html-minifier",
      {
        "modules": {
          "lit-html": [ "html" ],
          "lit-element": [ "html", { "name": "css", "encapsulation": "style" }],
        },
        "strictCSS": true,
        "htmlMinifier": {
          "collapseWhitespace": true,
          "conservativeCollapse": true,
          "removeComments": true,
          "caseSensitive": true,
          "minifyCSS": true
        },
      }
    ],
    [
      "transform-imports",
      {
        /* Example:
        "@material-ui/core": {
          "transform": "@material-ui/core/${member}",
          "preventFullImport": true
        }*/
      }
    ]
  ]
};
