import * as path from "path";

import { Configuration } from "webpack";

import { BABEL_CONFIG } from "#/build/config/babel.config";
import { BUILD_CONFIGURATION_PATH, PROJECT_ROOT_PATH } from "#/build/config/webpack.constants";

export const MODULE_CONFIG: Partial<Configuration["module"]> = {
  rules: [
    {
      enforce: "pre",
      exclude: /(node_modules|\.spec\.js)/,
      test: /\.(ts|tsx|js|jsx)$/,
      use: [{ loader: path.resolve(BUILD_CONFIGURATION_PATH, "loaders/stripBlockLoader.ts") }],
    },
    {
      exclude: /node_modules/,
      loader: "babel-loader",
      options: BABEL_CONFIG,
      test: /\.(js|mjs|jsx|ts|tsx)$/,
    },
    {
      loader: "handlebars-loader",
      options: {
        helperDirs: path.resolve(PROJECT_ROOT_PATH, "cli/build/template/helpers"),
        partialDirs: path.resolve(PROJECT_ROOT_PATH, "cli/build/template/partials"),
      },
      test: /\.hbs$/,
    },
    {
      test: /\.(gif|png|jpe|jpg|svg)$/i,
      use: [
        {
          loader: "url-loader",
          options: {
            limit: 5000, // include < 5KB files in bundle file
            name: "images/[name].[ext]",
          },
        },
      ],
    },
  ],
};
