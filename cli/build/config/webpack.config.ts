import { Configuration } from "webpack";

import { ENVIRONMENT } from "./webpack.constants";
import { DEV_CONFIG } from "./webpack.dev.config";
import { IO_CONFIG } from "./webpack.io.config";
import { MODULE_CONFIG } from "./webpack.module.config";
import { PERFORMANCE_CONFIG } from "./webpack.performance.config";
import { PLUGIN_CONFIG } from "./webpack.plugin.config";

/**
 * Restrict build with environment declaration to prevent unexpected issues.
 */
if (!ENVIRONMENT) {
  throw new Error("Environment must be set for webpack build.");
}

/**
 * Project-level webpack configuration.
 * Bundled from multiple computed scripts.
 */
export const WEBPACK_CONFIG: Configuration = {
  devServer: DEV_CONFIG.DEV_SERVER,
  devtool: DEV_CONFIG.DEV_TOOL,
  entry: IO_CONFIG.ENTRY,
  mode: ENVIRONMENT,
  module: MODULE_CONFIG.MODULE,
  optimization: PLUGIN_CONFIG.OPTIMIZATION,
  output: IO_CONFIG.OUTPUT,
  plugins: PLUGIN_CONFIG.PLUGINS,
  resolve: MODULE_CONFIG.RESOLVE,
  stats: DEV_CONFIG.STATS,
  performance: PERFORMANCE_CONFIG,
  target: "web"
} as any; // For dev server, todo;

export default WEBPACK_CONFIG;
