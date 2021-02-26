import * as path from "path";

import { WebpackOptionsNormalized } from "webpack";

import * as packageConfig from "../../../package.json";

import { BABEL_CONFIG } from "./babel.config";
import {
  BUILD_CONFIGURATION_PATH,
  IS_PRODUCTION,
  PROJECT_ROOT_NODE_MODULES_PATH,
  PROJECT_ROOT_PATH
} from "./webpack.constants";

interface IAliasDescription {
  [index: string]: string;
}

const generateGlobalDependenciesAlias = (): IAliasDescription => {
  return Object
    .keys(packageConfig.dependencies)
    .reduce((acc: { [idx: string]: string }, pkg: string) =>
      (acc[pkg] = path.resolve(PROJECT_ROOT_NODE_MODULES_PATH, pkg), acc), {});
};

export const MODULE_CONFIG: {
  RESOLVE: WebpackOptionsNormalized["resolve"];
  MODULE: Partial<WebpackOptionsNormalized["module"]>;
} = {
  MODULE: {
    rules: [
      // Strip DEV code.
      {
        enforce: "pre",
        exclude: /(node_modules|\.spec\.js)/,
        test: /\.(ts|tsx|js|jsx)$/,
        use: [
          { loader: path.resolve(BUILD_CONFIGURATION_PATH, "loaders/stripBlockLoader.ts") }
        ]
      },
      // TS/TSX/JS/JSX.
      {
        exclude: /node_modules\/(?!(lit-element|lit-html|dreamstate))/,
        loader: "babel-loader",
        options: BABEL_CONFIG,
        test: /\.(js|jsx|ts|tsx)$/
      },
      // HBS.
      {
        loader: "handlebars-loader",
        options: {
          helperDirs: path.resolve(PROJECT_ROOT_PATH, "cli/build/template/helpers"),
          partialDirs: path.resolve(PROJECT_ROOT_PATH, "cli/build/template/partials")
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
      }
    ]
  },
  RESOLVE: {
    alias: {
      "@Api": path.resolve(PROJECT_ROOT_PATH, "src/api/"),
      "@Application": path.resolve(PROJECT_ROOT_PATH, "src/application/"),
      "@Build": path.resolve(BUILD_CONFIGURATION_PATH),
      "@Lib": path.resolve(PROJECT_ROOT_PATH, "src/lib/"),
      "@Core": path.resolve(PROJECT_ROOT_PATH, "src/application/core/"),
      "@Modules": path.resolve(PROJECT_ROOT_PATH, "src/application/modules/"),
      // Make explicit global-level dependencies.
      ...generateGlobalDependenciesAlias()
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
