import {
  BACKEND_PUBLIC_PATH,
  DEV_SERVER_CONTENT_BASE,
  DEV_SERVER_HOST,
  DEV_SERVER_PORT, IModulesDefinition,
  IS_PRODUCTION,
  MODULES_CONFIG
} from "./webpack.constants";
import { Options }  from "webpack";

/**
 * Generate fallback redirects/urls for dev server history usage.
 */
const createFallbackRewrites = (definition: IModulesDefinition) => {

  const rewrites: Array<{ from: RegExp, to: string }> = [];

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
  DEV_SERVER: object,
  STATS: Options.Stats,
  DEV_TOOL: Options.Devtool
} = {
  DEV_SERVER: {
    clientLogLevel: "error",
    compress: IS_PRODUCTION,
    contentBase: DEV_SERVER_CONTENT_BASE,
    // todo: No-cache for dev?
    headers: {},
    historyApiFallback: {
      rewrites: createFallbackRewrites(MODULES_CONFIG)
    },
    host: DEV_SERVER_HOST,
    // http2: true, // Unsupported for node 10+.
    https: false,
    inline: !IS_PRODUCTION,
    port: DEV_SERVER_PORT,
    publicPath: BACKEND_PUBLIC_PATH
  },
  STATS: {
    assets: true,
    children: false,
    chunkModules: true,
    chunks: false,
    colors: true,
    modules: false,
    timings: true
  },
  DEV_TOOL: IS_PRODUCTION ? false : "source-map"
};
