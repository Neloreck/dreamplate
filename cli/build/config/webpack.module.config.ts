import * as path from "path";
import { Module, Resolve } from "webpack";

import { BUILD_CONFIGURATION_PATH, IS_PRODUCTION, PROJECT_ROOT_PATH, TS_CONFIG_PATH } from "./webpack.constants";

export const MODULE_CONFIG: {
  RESOLVE: Resolve,
  MODULE: Module
} = {
  MODULE: {
    rules: [
      // STRIP DEV CODE.
      {
        enforce: "pre",
        exclude: /(node_modules|\.spec\.js)/,
        test: /\.(ts|tsx)$/,
        use: [
          { loader: path.resolve(BUILD_CONFIGURATION_PATH, "loaders/stripBlockLoader.ts") }
        ],
      },
      // TS/TSX.
      {
        exclude: /(node_modules)/,
        loader: "awesome-typescript-loader",
        query: {
          configFileName: TS_CONFIG_PATH
        },
        test: /\.(ts|tsx)$/
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
      // IMAGES AS B64.
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
      },
      // IMAGES AS ASSET.
      {
        test: /\.(gif|png|jpe|jpg|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
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
      "@Build": path.resolve(BUILD_CONFIGURATION_PATH),
      "@Lib": path.resolve(PROJECT_ROOT_PATH, "./src/lib/"),
      "@Main": path.resolve(PROJECT_ROOT_PATH, "./src/application/main/"),
      "@Modules": path.resolve(PROJECT_ROOT_PATH, "./src/application/modules/")
    },
    extensions: [
      ".ts",
      ".tsx",
      ".js",
      ".jsx",
      ".json"
    ],
    modules: [
      "node_modules"
    ]
  }
};

if (IS_PRODUCTION) {
  // Production alias.
} else {
  (MODULE_CONFIG.RESOLVE.alias as any)["react-dom"] = "@hot-loader/react-dom";
}
