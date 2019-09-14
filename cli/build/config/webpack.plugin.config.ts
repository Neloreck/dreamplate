import { CheckerPlugin } from "awesome-typescript-loader";
import * as path from "path";
import { DefinePlugin, Options, Plugin, ProvidePlugin } from "webpack";

// tslint:disable: no-var-requires typedef
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const DotEnv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ScriptExtHtmlPlugin = require("script-ext-html-webpack-plugin");

import { APPLICATION_ROOT, APPLICATION_TITLE } from "../build_constants";
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
          compress: {
            drop_console: IS_PRODUCTION,
            ecma: 5,
            passes: IS_PRODUCTION ? 3 : 1
          },
          keep_classnames: !IS_PRODUCTION,
          keep_fnames: !IS_PRODUCTION,
          output: {
            beautify: false,
            ecma: 5
          }
        },
      })
    ],
    moduleIds: "hashed",
    noEmitOnErrors: IS_PRODUCTION,
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
      chunks: "async" as "async",
      maxAsyncRequests: 50,
      maxInitialRequests: 25,
      maxSize: 244_000,
      minSize: 10_000,
      name: true
    }
  },
  PLUGINS: [
    new DuplicatePackageCheckerPlugin({ verbose: true }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: false,
      reportFilename: "../info/report.html"
    }),
    new CheckerPlugin(),
    new DotEnv({ path: path.resolve(PROJECT_ROOT_PATH, `cli/build/config/.${ENVIRONMENT}.env`) }),
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
    new DefinePlugin({
      IS_DEV: !IS_PRODUCTION
    }),
    new ProvidePlugin({
      React: "react"
    }),
    new CopyWebpackPlugin([
        { from: path.resolve(BUILD_CONFIGURATION_PATH, "public/robots.txt"), to: "." },
        { from: path.resolve(BUILD_CONFIGURATION_PATH, "public/manifest.json"), to: "." }
      ]
    ),
    new ScriptExtHtmlPlugin({ defaultAttribute: "defer" }),
    new HtmlWebpackInlineSourcePlugin()
  ],
};
