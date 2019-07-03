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

import { ENVIRONMENT, IS_PRODUCTION, PROJECT_ROOT_PATH } from "./webpack.constants";

export const PLUGIN_CONFIG: {
  PLUGINS: Array<Plugin>,
  OPTIMIZATION: Options.Optimization
} = {
  OPTIMIZATION: {
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
    noEmitOnErrors: IS_PRODUCTION,
    removeAvailableModules: true,
    runtimeChunk: "multiple",
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
          reuseExistingChunk: true,
          test: /[\\/]node_modules[\\/]/
        }
      },
      chunks: "all" as "all",
      maxAsyncRequests: 30,
      maxInitialRequests: 15,
      maxSize: 500_000,
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
      openAnalyzer: false
    }),
    new CheckerPlugin(),
    new DotEnv({
      path: path.resolve(PROJECT_ROOT_PATH, `cli/build/config/.${ENVIRONMENT}.env`)
    }),
    new HtmlWebpackPlugin({
      ENVIRONMENT,
      favicon: path.resolve(PROJECT_ROOT_PATH, "cli/build/template/favicon.ico"),
      filename: "index.html",
      inject: true,
      inlineSource: "(.css)|(.*main.*)|(.*runtime.*)",
      minify: {
        minifyCSS: true,
        preserveLineBreaks: true,
        quoteCharacter: "'",
        removeTagWhitespace: true,
        trimCustomFragments: true
      },
      template: path.resolve(PROJECT_ROOT_PATH, "cli/build/template/index.hbs")
    }),
    new ProvidePlugin({
      React: "react"
    })
  ],
};

if (IS_PRODUCTION) {
  PLUGIN_CONFIG.PLUGINS.push(new HtmlWebpackInlineSourcePlugin());
} else {
  PLUGIN_CONFIG.PLUGINS.push(new HotModuleReplacementPlugin());
}
