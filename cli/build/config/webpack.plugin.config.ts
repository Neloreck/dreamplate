import { CheckerPlugin, TsConfigPathsPlugin } from "awesome-typescript-loader";
import * as path from "path";
import { HotModuleReplacementPlugin, NoEmitOnErrorsPlugin, Options, Plugin } from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

// tslint:disable: no-var-requires typedef
const DotEnv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

import { ENVIRONMENT, IS_PRODUCTION, PROJECT_ROOT_PATH } from "./webpack.constants";

export const PLUGIN_CONFIG: {
  PLUGINS: Array<Plugin>,
  OPTIMIZATION: Options.Optimization
} = {
  OPTIMIZATION: {
    minimizer: [
      new TerserPlugin({
        sourceMap: !IS_PRODUCTION,
        terserOptions: {
          compress: {},
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
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: (module: any): string => `package.${module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1].replace("@", "")}`,
          test: /[\\/]node_modules[\\/]/
        }
      },
      chunks: "all" as "all",
      maxAsyncRequests: 20,
      maxInitialRequests: 30,
      maxSize: 500_000,
      minSize: 5_000,
      name: true
    },
    usedExports: true,
  },
  PLUGINS: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: false
    }),
    new TsConfigPathsPlugin({}),
    new CheckerPlugin(),
    new HtmlWebpackPlugin({
      ENVIRONMENT,
      favicon: path.resolve(PROJECT_ROOT_PATH, "cli/build/template/favicon.ico"),
      filename: "index.html",
      inject: true,
      minify: {
        minifyCSS: true,
        preserveLineBreaks: true,
        quoteCharacter: "'",
        removeTagWhitespace: true,
        trimCustomFragments: true
      },
      template: path.resolve(PROJECT_ROOT_PATH, "cli/build/template/index.hbs")
    }),
    new DotEnv({
      path: path.resolve(PROJECT_ROOT_PATH, `cli/build/config/.${ENVIRONMENT}.env`)
    }),
    IS_PRODUCTION ? new NoEmitOnErrorsPlugin() : new HotModuleReplacementPlugin()
  ],
};
