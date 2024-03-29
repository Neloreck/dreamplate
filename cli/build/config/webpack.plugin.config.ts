/* eslint @typescript-eslint/no-var-requires: 0 */

import * as fs from "fs";
import * as path from "path";

import { Configuration, DefinePlugin, ProvidePlugin, SourceMapDevToolPlugin } from "webpack";

import { APPLICATION_ROOT, PORTAL_ROOT } from "#/globals/build_constants";

import {
  BACKEND_PUBLIC_PATH,
  BASE_PROJECT_FAVICON_PATH,
  BASE_PROJECT_STATIC_PATH,
  BASE_PROJECT_TEMPLATE_PATH,
  DEV_SERVER_REFRESH,
  DOTENV_CONFIG_PATH,
  ENVIRONMENT,
  IS_ANALYZE_ENABLED,
  IS_PRODUCTION,
  MODULES_CONFIG,
  MODULES_ROOT_PATH,
  PROJECT_INLINE_MODULES,
  REPORT_BUNDLE_ANALYZER_PATH,
  REPORT_BUNDLE_STATS_PATH,
  RUNTIME_CONSTANTS,
  TS_CONFIG_PATH,
} from "./webpack.constants";
import { IModuleDefinition } from "./webpack.types";

// CJS way to import most plugins.
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const DotEnv = require("dotenv-webpack");
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InlineChunkHtmlPlugin = require("react-dev-utils/InlineChunkHtmlPlugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;

/**
 * For each module create separate HTML entry with own dependencies.
 */
function createHTMLEntry(definition: IModuleDefinition): typeof HtmlWebpackPlugin {
  const modulePath: string = path.resolve(MODULES_ROOT_PATH, definition.entry);
  const moduleTemplatePath: string = path.resolve(modulePath, "index.hbs");

  return new HtmlWebpackPlugin({
    ENVIRONMENT,
    chunks: ["initialization", definition.name],
    chunksSortMode: "manual",
    constants: {
      APPLICATION_ROOT,
      APPLICATION_TITLE: definition.title,
      PORTAL_ROOT,
    },
    favicon: BASE_PROJECT_FAVICON_PATH,
    filename: `html/${definition.name}.html`,
    inject: "body",
    minify: {
      collapseWhitespace: IS_PRODUCTION,
      minifyCSS: true,
      preserveLineBreaks: !IS_PRODUCTION,
      quoteCharacter: "'",
      removeComments: true,
      removeTagWhitespace: true,
      trimCustomFragments: true,
    },
    template: fs.existsSync(moduleTemplatePath) ? moduleTemplatePath : BASE_PROJECT_TEMPLATE_PATH,
  });
}

/**
 * Webpack plugins configuration.
 */
export const PLUGIN_CONFIG: Configuration["plugins"] = [
  /**
   * Generate HTML for each module.
   * Maintain separate submodule with own base template for each application.
   */
  ...MODULES_CONFIG.modules.map(createHTMLEntry),
  new DuplicatePackageCheckerPlugin({ verbose: true }),
  new DotEnv({ path: DOTENV_CONFIG_PATH }),
  new DefinePlugin(RUNTIME_CONSTANTS),
  new ProvidePlugin({ React: "react" }),
  new CopyWebpackPlugin({
    patterns: [{ from: BASE_PROJECT_STATIC_PATH }],
  }),
  new ForkTsCheckerWebpackPlugin({
    devServer: false,
    typescript: {
      enabled: true,
      configFile: TS_CONFIG_PATH,
    },
  }),
  new InlineChunkHtmlPlugin(HtmlWebpackPlugin, PROJECT_INLINE_MODULES),
]
  .concat(
    IS_PRODUCTION
      ? []
      : [
        new SourceMapDevToolPlugin({
          filename: "source_maps/[base].map[query]",
          publicPath: BACKEND_PUBLIC_PATH,
          exclude: [...PROJECT_INLINE_MODULES],
          fileContext: "public",
        }),
      ]
  )
  .concat(
    DEV_SERVER_REFRESH
      ? [
        new ReactRefreshWebpackPlugin({
          exclude: [/\/application\/initialization/, /node_modules/],
        }),
      ]
      : []
  )
  .concat(
    IS_ANALYZE_ENABLED
      ? [
        new BundleAnalyzerPlugin({
          analyzerMode: "static",
          defaultSizes: "gzip",
          openAnalyzer: false,
          reportFilename: REPORT_BUNDLE_ANALYZER_PATH,
        }),
        new StatsWriterPlugin({
          filename: REPORT_BUNDLE_STATS_PATH,
          stats: {
            all: true,
            assets: true,
            assetsByChunkName: true,
            children: false,
            chunks: false,
            entrypoints: true,
            hash: true,
            logging: false,
            modules: false,
            namedChunkGroups: false,
            outputPath: false,
            publicPath: false,
            version: false,
          },
        }),
      ]
      : []
  );
