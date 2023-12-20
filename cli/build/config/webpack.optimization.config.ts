import { Configuration } from "webpack";

import {
  IS_PRODUCTION,
  MAX_CORE_CHUNK_SIZE,
  MODULES_CONFIG,
  PROJECT_CORE_DEPENDENCIES,
} from "#/build/config/webpack.constants";
import { IModuleDefinition } from "#/build/config/webpack.types";

// CJS way to import most plugins.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const JsonMinimizerPlugin = require("json-minimizer-webpack-plugin");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const TerserPlugin = require("terser-webpack-plugin");

/**
 * Create separate chunks/dependencies for each module group with shared core/base.
 */
function createChunkCacheGroups(definitions: Array<IModuleDefinition>): Record<string, any> {
  const entries: Record<string, any> = {};

  for (const it of definitions) {
    entries[`modules/${it.name}/l`] = {
      maxSize: 750 * 1000,
      priority: 60,
      reuseExistingChunk: true,
      test: new RegExp(`/modules/${it.name}/node_modules/`),
    };

    entries[`modules/${it.name}/s`] = {
      maxSize: 250 * 1000,
      priority: 30,
      reuseExistingChunk: true,
      test: new RegExp(`/modules/${it.name}/`),
    };
  }

  return entries;
}

/**
 * Webpack plugins configuration.
 */
export const OPTIMIZATION_CONFIG: Configuration["optimization"] = {
  minimizer: [
    new TerserPlugin({
      terserOptions: {
        ecma: 5,
        compress: {
          ["drop_console"]: IS_PRODUCTION,
          passes: IS_PRODUCTION ? 5 : 1,
        },
        output: {
          comments: IS_PRODUCTION ? false : "some",
        },
      },
    }),
    new JsonMinimizerPlugin(),
  ],
  moduleIds: "deterministic",
  emitOnErrors: !IS_PRODUCTION,
  runtimeChunk: "single",
  splitChunks: {
    cacheGroups: {
      core: {
        maxSize: MAX_CORE_CHUNK_SIZE,
        priority: 100,
        reuseExistingChunk: false,
        test: new RegExp(
          `/node_modules/(${PROJECT_CORE_DEPENDENCIES.reduce((accumulator: string, it: string) =>
            accumulator ? accumulator + "|" + it : it)})/`
        ),
      },
      vendor: {
        priority: 70,
        maxSize: MAX_CORE_CHUNK_SIZE,
        reuseExistingChunk: false,
        test: /\/src\/node_modules\//,
      },
      ...createChunkCacheGroups(MODULES_CONFIG.modules),
      shared: {
        priority: 10,
        maxSize: MAX_CORE_CHUNK_SIZE,
        reuseExistingChunk: true,
        test: /node_modules/,
      },
    },
    chunks: "all",
    maxAsyncRequests: 50,
    maxInitialRequests: 25,
    maxSize: 300 * 1000,
    minSize: 5 * 1000,
  },
};
