import { CheckerPlugin } from "awesome-typescript-loader";
import * as path from "path";
import { HotModuleReplacementPlugin, Options, Plugin, ProvidePlugin } from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

// tslint:disable: no-var-requires typedef
const DotEnv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackInlineSourcePlugin  = require("html-webpack-inline-source-plugin");
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ScriptExtHtmlPlugin = require("script-ext-html-webpack-plugin");

import { APPLICATION_ROOT, APPLICATION_TITLE } from "../BuildConstants";
import { BUILD_CONFIGURATION_PATH, ENVIRONMENT, IS_PRODUCTION, PROJECT_ROOT_PATH } from "./webpack.constants";

export const PLUGIN_CONFIG: {
  PLUGINS: Array<Plugin>,
  OPTIMIZATION: Options.Optimization
} = {
  OPTIMIZATION: {
    chunkIds: "natural",
    mergeDuplicateChunks: true,
    minimizer: [
      new TerserPlugin({
        sourceMap: !IS_PRODUCTION,
        terserOptions: {
          compress: true,
          ecma: 6,
          ie8: false,
          keep_classnames: false,
          keep_fnames: true,
          mangle: true,
          module: true,
          nameCache: null,
          output: {
            beautify: false
          },
          parse: {},
          safari10: false,
          toplevel: false,
          unused: false,
          warnings: false
        },
      })
    ],
    moduleIds: "hashed",
    noEmitOnErrors: IS_PRODUCTION,
    occurrenceOrder: false,
    removeAvailableModules: true,
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: IS_PRODUCTION
            ? (module: any, chunks: any, cacheGroupKey: string): string => `p~${cacheGroupKey}`
            : (module: any, chunks: any, cacheGroupKey: string): string => {

              const moduleFileName: string = module.identifier().split("/").reduceRight((item: string) => item);
              const allChunksNames: string = chunks.map((item: { name: string }) => item.name).join("~");

              return `p~${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
            },
          priority: 10,
          reuseExistingChunk: true,
          test: /[\\/]node_modules[\\/]/
        }
      },
      chunks: "all" as "all",
      maxAsyncRequests: 50,
      maxInitialRequests: 25,
      maxSize: 300_000,
      minSize: 10_000,
      name: true
    },
    usedExports: true
  },
  PLUGINS: [
    new DuplicatePackageCheckerPlugin({
      verbose: true
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: false,
      reportFilename: "../info/report.html"
    }),
    new CheckerPlugin(),
    new DotEnv({
      path: path.resolve(PROJECT_ROOT_PATH, `cli/build/config/.${ENVIRONMENT}.env`)
    }),
    new HtmlWebpackPlugin({
      ENVIRONMENT,
      constants: {
        APPLICATION_ROOT,
        APPLICATION_TITLE
      },
      favicon: path.resolve(PROJECT_ROOT_PATH, "cli/build/template/favicon.ico"),
      filename: "index.html",
      inject: true,
      inlineSource: "(.css)|(init)|(.*runtime.*)",
      minify: {
        collapseWhitespace: IS_PRODUCTION,
        minifyCSS: true,
        preserveLineBreaks: true,
        quoteCharacter: "'",
        removeComments: true,
        removeTagWhitespace: true,
        trimCustomFragments: true
      },
      template: path.resolve(PROJECT_ROOT_PATH, "cli/build/template/index.hbs")
    }),
    new ProvidePlugin({
      React: "react"
    }),
    new CopyWebpackPlugin([
        { from: path.resolve(BUILD_CONFIGURATION_PATH, "public/robots.txt"), to: "." },
        { from: path.resolve(BUILD_CONFIGURATION_PATH, "public/manifest.json"), to: "." }
      ]
    ),
    new ScriptExtHtmlPlugin({
      defaultAttribute: "defer",
    }),
    new HtmlWebpackInlineSourcePlugin()
  ],
};

if (IS_PRODUCTION) {
  // Push specific plugins.
} else {
  PLUGIN_CONFIG.PLUGINS.push(new HotModuleReplacementPlugin());
}
