import { WebpackOptionsNormalized } from "webpack";

import {
  BACKEND_PUBLIC_PATH,
  DEV_SERVER_CONTENT_BASE,
  DEV_SERVER_HOST,
  DEV_SERVER_PORT,
  IS_PRODUCTION,
  MODULES_CONFIG
} from "./webpack.constants";
import { IModulesDefinition } from "./webpack.types";

/**
 * Generate fallback redirects/urls for dev server history usage.
 */
const createFallbackRewrites = (definition: IModulesDefinition) => {
  const rewrites: Array<{ from: RegExp; to: string }> = [];

  for (const module of definition.modules) {
    if (Array.isArray(module.path)) {
      for (const from of module.path) {
        rewrites.push({ from: new RegExp(from), to: `/html/${module.name}.html` });
      }
    } else {
      rewrites.push({ from: new RegExp(module.path), to: `/html/${module.name}.html` });
    }
  }

  return rewrites;
};

export const DEV_CONFIG: {
  DEV_SERVER: WebpackOptionsNormalized["devServer"];
  STATS: WebpackOptionsNormalized["stats"];
  DEV_TOOL: WebpackOptionsNormalized["devtool"];
} = {
  DEV_SERVER: {
    clientLogLevel: "error",
    compress: IS_PRODUCTION,
    contentBase: DEV_SERVER_CONTENT_BASE,
    headers: {
      // "Cache-Control": "max-age=60"
    },
    historyApiFallback: {
      rewrites: createFallbackRewrites(MODULES_CONFIG)
    },
    host: DEV_SERVER_HOST,
    hot: true,
    // http2: true, // Unsupported for node 10+.
    https: false,
    inline: !IS_PRODUCTION,
    port: DEV_SERVER_PORT,
    publicPath: BACKEND_PUBLIC_PATH
  },
  DEV_TOOL: IS_PRODUCTION ? false : "source-map",
  STATS: {
    assets: true,
    children: false,
    chunkModules: false,
    chunks: false,
    colors: true,
    modules: false,
    timings: true
  }
};
