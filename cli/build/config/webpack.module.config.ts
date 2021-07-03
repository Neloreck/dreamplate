import * as path from "path";

import { Configuration } from "webpack";

import * as packageConfig from "../../../package.json";

import { BABEL_CONFIG } from "./babel.config";
import {
  BUILD_CONFIGURATION_PATH,
  PROJECT_ROOT_NODE_MODULES_PATH,
  PROJECT_ROOT_PATH
} from "./webpack.constants";

/**
 * Generate global alias for top-level dependencies.
 * Allows avoid defining react everywhere for JSX usage.
 */
function generateGlobalDependenciesAlias(): Record<string, string> {
  return Object
    .keys(packageConfig.dependencies)
    .reduce((acc: Record<string, string>, pkg: string) =>
      (acc[pkg] = path.resolve(PROJECT_ROOT_NODE_MODULES_PATH, pkg), acc), {});
}

export const MODULE_CONFIG: {
  RESOLVE: Configuration["resolve"];
  MODULE: Partial<Configuration["module"]>;
} = {
  MODULE: {
    rules: [
      {
        enforce: "pre",
        exclude: /(node_modules|\.spec\.js)/,
        test: /\.(ts|tsx|js|jsx)$/,
        use: [
          { loader: path.resolve(BUILD_CONFIGURATION_PATH, "loaders/stripBlockLoader.ts") }
        ]
      },
      {
        exclude: /node_modules/,
        loader: "babel-loader",
        options: BABEL_CONFIG,
        test: /\.(js|mjs|jsx|ts|tsx)$/
      },
      {
        loader: "handlebars-loader",
        options: {
          helperDirs: path.resolve(PROJECT_ROOT_PATH, "cli/build/template/helpers"),
          partialDirs: path.resolve(PROJECT_ROOT_PATH, "cli/build/template/partials")
        },
        test: /\.hbs$/
      },
      {
        test: /\.(gif|png|jpe|jpg|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 5000, // include < 5KB files in bundle file
              name: "images/[name].[ext]"
            }
          }
        ]
      }
    ]
  },
  RESOLVE: {
    alias: {
      "#": path.resolve(BUILD_CONFIGURATION_PATH, "./"),
      "@": path.resolve(PROJECT_ROOT_PATH, "src/application/"),
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
