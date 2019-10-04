import { CheckerPlugin } from "awesome-typescript-loader";
import * as path from "path";
import { DefinePlugin, Options, Plugin, ProvidePlugin } from "webpack";

import { APPLICATION_ROOT, MODAL_ROOT } from "../build_constants";
import {
  BUILD_CONFIGURATION_PATH,
  ENVIRONMENT,
  IModuleDefinition,
  IS_PRODUCTION,
  MODULES_CONFIG,
  PROJECT_ROOT_PATH,
  RUNTIME_CONSTANTS
} from "./webpack.constants";

// tslint:disable: no-var-requires typedef
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const DotEnv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ScriptExtHtmlPlugin = require("script-ext-html-webpack-plugin");
const StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;

const CORE_DEPENDENCIES: Array<string> = [
  "react",
  "react-dom",
  "loose-envify",
  "object-assign",
  "scheduler",
  "core-js"
];

const createChunkGroupNameGenerator = () => (module: any, chunks: any, cacheGroupKey: string): string => cacheGroupKey;

const createChunkCacheGroups = (definitions: Array<IModuleDefinition>) => {

  const entries: { [index: string]: any } = {};

  for (const it of definitions) {
    entries[it.name + "_npm"] = ({
      maxSize: 900_00,
      name: createChunkGroupNameGenerator(),
      priority: 120,
      reuseExistingChunk: true,
      test: new RegExp(`\/modules\/${it.name}\/node_modules\/`)
    });
  }

  return entries;
};

const createHTMLEntry = (definition: IModuleDefinition) => (
  new HtmlWebpackPlugin({
    ENVIRONMENT,
    chunks: [ "initialization", definition.name ],
    constants: {
      APPLICATION_ROOT,
      APPLICATION_TITLE: definition.title,
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
    providedExports: IS_PRODUCTION,
    removeEmptyChunks: true,
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        api: {
          name: createChunkGroupNameGenerator(),
          priority: 80,
          reuseExistingChunk: false,
          test: /\/src\/api/
        },
        components: {
          minSize: 5_000,
          name: createChunkGroupNameGenerator(),
          priority: 90,
          reuseExistingChunk: true,
          test: /(\/application\/lib\/components)|(\/node_modules\/lit-.*)/
        },
        core: {
          maxSize: 500_000,
          name: createChunkGroupNameGenerator(),
          priority: 100,
          reuseExistingChunk: true,
          test: new RegExp(`/node_modules/(${CORE_DEPENDENCIES.reduce((accumulator: string, it: string) => accumulator ? accumulator + "|" + it : it )})\/`)
        },
        default: false,
        global: {
          name: createChunkGroupNameGenerator(),
          priority: 70,
          reuseExistingChunk: false,
          test: /\/src\/node_modules\//
        },
        ...createChunkCacheGroups(MODULES_CONFIG.modules)
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
      defaultSizes: "gzip",
      openAnalyzer: false,
      reportFilename: "../info/report.html"
    }),
    new StatsWriterPlugin({
      filename:  "../info/report.json",
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
    }),
    new CheckerPlugin(),
    new DotEnv({ path: path.resolve(PROJECT_ROOT_PATH, `cli/build/config/.${ENVIRONMENT}.env`) }),
    new DefinePlugin(RUNTIME_CONSTANTS),
    new ProvidePlugin({ React: "react" }),
    new CopyWebpackPlugin([
        { from: path.resolve(BUILD_CONFIGURATION_PATH, "public/robots.txt"), to: "." },
        { from: path.resolve(BUILD_CONFIGURATION_PATH, "public/manifest.json"), to: "." }
      ]
    ),
    new ScriptExtHtmlPlugin({
      defaultAttribute: "async",
      inline: [ "runtime", "initialization" ]
    })
  ]
};
