import { DefinePlugin, Options, Plugin, ProvidePlugin } from "webpack";

import { APPLICATION_ROOT, MODAL_ROOT } from "../build_constants";
import {
  BASE_PROJECT_FAVICON_PATH, BASE_PROJECT_STATIC_FILES,
  BASE_PROJECT_TEMPLATE_PATH,
  DOTENV_CONFIG_PATH,
  ENVIRONMENT,
  IS_PRODUCTION,
  MODULES_CONFIG,
  PROJECT_CORE_DEPENDENCIES,
  PROJECT_INLINE_MODULES,
  PROVIDE_MODULES_CONFIG,
  REPORT_BUNDLE_ANALYZER_PATH,
  REPORT_BUNDLE_STATS_PATH,
  RUNTIME_CONSTANTS
} from "./webpack.constants";
import { IModuleDefinition } from "./webpack.types";

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const DotEnv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ScriptExtHtmlPlugin = require("script-ext-html-webpack-plugin");
const StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;

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
    favicon: BASE_PROJECT_FAVICON_PATH,
    filename: `html/${definition.name}.html`,
    inject: true,
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
  })
);

export const PLUGIN_CONFIG: {
  PLUGINS: Array<Plugin>,
  OPTIMIZATION: Options.Optimization
} = {
  OPTIMIZATION: {
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
            beautify: !IS_PRODUCTION,
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
          test: /(\/lib\/components)|(\/node_modules\/lit-.*)/
        },
        core: {
          maxSize: 500_000,
          name: createChunkGroupNameGenerator(),
          priority: 100,
          reuseExistingChunk: true,
          test: new RegExp(`/node_modules/(${PROJECT_CORE_DEPENDENCIES.reduce((accumulator: string, it: string) => accumulator ? accumulator + "|" + it : it )})\/`)
        },
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
    new DotEnv({ path: DOTENV_CONFIG_PATH }),
    new DefinePlugin(RUNTIME_CONSTANTS as {}),
    new ProvidePlugin(PROVIDE_MODULES_CONFIG),
    new CopyWebpackPlugin(BASE_PROJECT_STATIC_FILES.map((it: string) => ({ from: it, to: "." }))),
    new ScriptExtHtmlPlugin({ defaultAttribute: "async", inline: PROJECT_INLINE_MODULES }),
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
    })
  ]
};
