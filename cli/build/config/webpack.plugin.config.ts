import { CheckerPlugin } from "awesome-typescript-loader";
import * as path from "path";
import { DefinePlugin, Options, Plugin, ProvidePlugin } from "webpack";

import { APPLICATION_ROOT, APPLICATION_TITLE, MODAL_ROOT } from "../build_constants";
import {
  BUILD_CONFIGURATION_PATH,
  ENVIRONMENT,
  IModuleDefinition,
  IS_PRODUCTION, MODULES_CONFIG, PROJECT_OUTPUT_PATH,
  PROJECT_ROOT_PATH
} from "./webpack.constants";

// tslint:disable: no-var-requires typedef
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const DotEnv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ScriptExtHtmlPlugin = require("script-ext-html-webpack-plugin");

const createHTMLEntry = (definition: IModuleDefinition) => (
  new HtmlWebpackPlugin({
    ENVIRONMENT,
    chunks: [ "initialization", definition.name ],
    constants: {
      APPLICATION_ROOT,
      APPLICATION_TITLE,
      MODAL_ROOT
    },
    favicon: path.resolve(PROJECT_ROOT_PATH, "cli/build/template/favicon.ico"),
    filename: `html/${definition.name}.html`,
    inject: true,
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
  })
);

const createChunkGroupNameGenerator = () => (module: any, chunks: any, cacheGroupKey: string): string => cacheGroupKey;

export const PLUGIN_CONFIG: {
  PLUGINS: Array<Plugin>,
  OPTIMIZATION: Options.Optimization
} = {
  OPTIMIZATION: {
    chunkIds: "named",
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
    namedChunks: false,
    noEmitOnErrors: IS_PRODUCTION,
    removeEmptyChunks: true,
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        api: {
          name: createChunkGroupNameGenerator(),
          priority: 30,
          reuseExistingChunk: false,
          test: /\/src\/api/
        },
        components: {
          minSize: 5_000,
          name: createChunkGroupNameGenerator(),
          priority: 20,
          reuseExistingChunk: false,
          test: /\/lib\/components/
        },
        core: {
          maxSize: 500_000,
          name: createChunkGroupNameGenerator(),
          priority: 50,
          reuseExistingChunk: true,
          test: /\/node_modules\/(react|core-js|history|scheduler|dreamstate|jss|lit-)/
        },
        default: false,
        npm: {
          name: createChunkGroupNameGenerator(),
          priority: 40,
          reuseExistingChunk: true,
          test: /\/node_modules\//
        }
      },
      chunks: "all",
      maxAsyncRequests: 50,
      maxInitialRequests: 25,
      maxSize: 244_000,
      minSize: 20_000,
      name: true
    }
  },
  PLUGINS: [
    ...MODULES_CONFIG.modules.map(createHTMLEntry),
    new DuplicatePackageCheckerPlugin({ verbose: true }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: false,
      reportFilename: path.resolve(PROJECT_OUTPUT_PATH, "info/report.html")
    }),
    new CheckerPlugin(),
    new DotEnv({ path: path.resolve(PROJECT_ROOT_PATH, `cli/build/config/.${ENVIRONMENT}.env`) }),
    new DefinePlugin({ IS_DEV: !IS_PRODUCTION }),
    new ProvidePlugin({ React: "react" }),
    new CopyWebpackPlugin([
        { from: path.resolve(BUILD_CONFIGURATION_PATH, "public/robots.txt"), to: "." },
        { from: path.resolve(BUILD_CONFIGURATION_PATH, "public/manifest.json"), to: "." }
      ]
    ),
    new ScriptExtHtmlPlugin({
      defaultAttribute: "defer",
      inline: [ "runtime", "initialization" ]
    })
  ],
};
