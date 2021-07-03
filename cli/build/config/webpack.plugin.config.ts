import * as path from "path";

import { DefinePlugin, Configuration, ProvidePlugin } from "webpack";

import { APPLICATION_ROOT, MODAL_ROOT } from "../globals/build_constants";

import {
  BASE_PROJECT_FAVICON_PATH,
  BASE_PROJECT_STATIC_FILES,
  BASE_PROJECT_TEMPLATE_PATH,
  DOTENV_CONFIG_PATH,
  ENVIRONMENT,
  IS_PRODUCTION,
  MODULES_CONFIG,
  PROJECT_CORE_DEPENDENCIES,
  PROJECT_INLINE_MODULES,
  PROJECT_ROOT_PATH,
  ANALYZE_ENABLED,
  REPORT_BUNDLE_ANALYZER_PATH,
  REPORT_BUNDLE_STATS_PATH,
  RUNTIME_CONSTANTS,
  TS_CONFIG_PATH, MAX_CORE_CHUNK_SIZE, DEV_SERVER_REFRESH
} from "./webpack.constants";
import { IModuleDefinition } from "./webpack.types";

// CJS way to import most plugins.
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const DotEnv = require("dotenv-webpack");
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlPlugin = require("script-ext-html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;

/**
 * Create separate chunks/dependencies for each module group with shared core/base.
 */
function createChunkCacheGroups(definitions: Array<IModuleDefinition>): Record<string, any> {
  const entries: Record<string, any> = {};

  for (const it of definitions) {
    entries[`modules/${it.name}/l`] = ({
      maxSize: 750 * 1000,
      priority: 60,
      reuseExistingChunk: true,
      test: new RegExp(`/modules/${it.name}/node_modules/`)
    });

    entries[`modules/${it.name}/s`] = ({
      maxSize: 250 * 1000,
      priority: 30,
      reuseExistingChunk: true,
      test: new RegExp(`/modules/${it.name}/`)
    });
  }

  return entries;
}

/**
 * For each module create separate HTML entry with own dependencies.
 */
function createHTMLEntry(definition: IModuleDefinition): typeof HtmlWebpackPlugin {
  return new HtmlWebpackPlugin({
    ENVIRONMENT,
    chunks: [ "initialization", definition.name ],
    chunksSortMode: "manual",
    constants: {
      APPLICATION_ROOT,
      APPLICATION_TITLE: definition.title,
      MODAL_ROOT
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
      trimCustomFragments: true
    },
    template: BASE_PROJECT_TEMPLATE_PATH
  });
}

/**
 * Webpack plugins configuration.
 */
export const PLUGIN_CONFIG: {
  PLUGINS: Configuration["plugins"];
  OPTIMIZATION: Configuration["optimization"];
} = {
  OPTIMIZATION: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            "drop_console": IS_PRODUCTION,
            ecma: 5,
            passes: IS_PRODUCTION ? 5 : 1
          },
          output: {
            beautify: !IS_PRODUCTION,
            ecma: 5
          }
        }
      })
    ],
    moduleIds: "deterministic",
    emitOnErrors: !IS_PRODUCTION,
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        "core": {
          maxSize: MAX_CORE_CHUNK_SIZE,
          priority: 100,
          reuseExistingChunk: false,
          test: new RegExp(
            `/node_modules/(${
              PROJECT_CORE_DEPENDENCIES.reduce((accumulator: string, it: string) =>
                accumulator ? accumulator + "|" + it : it)
            })/`
          )
        },
        "vendor": {
          priority: 70,
          maxSize: MAX_CORE_CHUNK_SIZE,
          reuseExistingChunk: false,
          test: /\/src\/node_modules\//
        },
        ...createChunkCacheGroups(MODULES_CONFIG.modules),
        "shared": {
          priority: 10,
          maxSize: MAX_CORE_CHUNK_SIZE,
          reuseExistingChunk: true,
          test: /node_modules/
        }
      },
      chunks: "all",
      maxAsyncRequests: 50,
      maxInitialRequests: 25,
      maxSize: 300 * 1000,
      minSize: 5 * 1000
    }
  },
  PLUGINS: [
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
      patterns: BASE_PROJECT_STATIC_FILES.map((it: string) => ({ from: it, to: "." }))
    }),
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        enabled: true,
        files: path.resolve(PROJECT_ROOT_PATH, "./src/**/*.{ts,tsx,js,jsx}")
      },
      typescript: {
        enabled: true,
        configFile: TS_CONFIG_PATH
      }
    }),
    // Async scripts load and inlining.
    new ScriptExtHtmlPlugin({ inline: PROJECT_INLINE_MODULES })
    /**
     * Add analyzers if ENV param is enabled.
     */
  ].concat(DEV_SERVER_REFRESH ? [
    new ReactRefreshWebpackPlugin({
      exclude: [
        /\/application\/initialization/,
        /node_modules/
      ]
    })
  ] :[
  ])
    .concat(ANALYZE_ENABLED ? [
      new BundleAnalyzerPlugin({
        analyzerMode: "static",
        defaultSizes: "gzip",
        openAnalyzer: false,
        reportFilename: REPORT_BUNDLE_ANALYZER_PATH
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
          version: false
        }
      }) ]: [])
};
