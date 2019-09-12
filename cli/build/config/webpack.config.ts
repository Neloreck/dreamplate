import { Configuration } from "webpack";

import { DEVELOPMENT_TOOL, ENVIRONMENT, STATS, TARGET } from "./webpack.constants";
import { DEV_SERVER_CONFIG } from "./webpack.devserver.config";
import { IO_CONFIG } from "./webpack.io.config";
import { MODULE_CONFIG } from "./webpack.module.config";
import { PLUGIN_CONFIG } from "./webpack.plugin.config";

export const WEBPACK_CONFIG: Configuration = {
  devServer: DEV_SERVER_CONFIG,
  devtool: DEVELOPMENT_TOOL,
  entry: IO_CONFIG.ENTRY,
  mode: ENVIRONMENT,
  module: MODULE_CONFIG.MODULE,
  optimization: PLUGIN_CONFIG.OPTIMIZATION,
  output: IO_CONFIG.OUTPUT,
  plugins: PLUGIN_CONFIG.PLUGINS,
  resolve: MODULE_CONFIG.RESOLVE,
  stats: STATS,
  target: TARGET
} as any; // For dev server.

export * from "./webpack.constants";

export default WEBPACK_CONFIG;
