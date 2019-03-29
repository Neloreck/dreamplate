import * as path from "path";
import { Module, Resolve } from "webpack";

// tslint:disable: no-var-requires typedef
const AutoPrefixer = require("autoprefixer");

import { IS_PRODUCTION, PROJECT_ROOT_PATH, TS_CONFIG_PATH } from "./webpack.constants";

export const MODULE_CONFIG: {
  RESOLVE: Resolve,
  MODULE: Module
} = {
  MODULE: {
    rules: [
      // TS/TSX.
      {
        exclude: /(node_modules)/,
        loader: "awesome-typescript-loader",
        query: {
          configFileName: TS_CONFIG_PATH
        },
        test: /\.(ts|tsx)$/
      },
      // SCSS/CSS.
      {
        test: /\.(scss|css)$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                AutoPrefixer({
                  browsers: ["ie >= 11", "last 10 version"]
                })
              ],
              sourceMap: !IS_PRODUCTION,
            }
          },
          "sass-loader"
        ]
      },
      // FONTS.
      {
        loader: "url-loader",
        query: {
          limit: 512,
          name: "fonts/[name].[ext]"
        },
        test: /\.(woff|woff2|eot|ttf)$/
      },
      // HBS.
      {
        loader: "handlebars-loader",
        options: {
          helperDirs: path.resolve(PROJECT_ROOT_PATH, "./cli/build/template/helpers"),
          partialDirs: path.resolve(PROJECT_ROOT_PATH, "./cli/build/template/partials")
        },
        test: /\.hbs$/
      },
      // IMAGES.
      {
        test: /\.(gif|png|jpe|jpg|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              // include < 5KB files in bundle file
              limit: 5000,
              name: "images/[name].[ext]"
            }
          }
        ]
      }
    ]
  },
  RESOLVE: {
    alias: {
      "@Api": path.resolve(PROJECT_ROOT_PATH, "./src/api/"),
      "@Application": path.resolve(PROJECT_ROOT_PATH, "./src/application/"),
      "@Lib": path.resolve(PROJECT_ROOT_PATH, "./src/lib/"),
      "@Localization": path.resolve(PROJECT_ROOT_PATH, "./src/localization/"),
      "@Main": path.resolve(PROJECT_ROOT_PATH, "./src/application/main"),
      "@Module": path.resolve(PROJECT_ROOT_PATH, "./src/application/modules/")
    },
    extensions: [
      ".ts",
      ".tsx",
      ".js",
      ".jsx",
      ".json"
    ],
    modules: [
      path.resolve(PROJECT_ROOT_PATH, "src/application"),
      path.resolve(PROJECT_ROOT_PATH, "node_modules")
    ]
  }
};
