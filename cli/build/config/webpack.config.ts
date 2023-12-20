import { Configuration } from "webpack";

import { ENVIRONMENT, IS_PRODUCTION } from "#/build/config/webpack.constants";
import { DEV_SERVER_CONFIG } from "#/build/config/webpack.devServer.config";
import { ENTRY_CONFIG } from "#/build/config/webpack.entry.config";
import { MODULE_CONFIG } from "#/build/config/webpack.module.config";
import { OPTIMIZATION_CONFIG } from "#/build/config/webpack.optimization.config";
import { OUTPUT_CONFIG } from "#/build/config/webpack.output.config";
import { PERFORMANCE_CONFIG } from "#/build/config/webpack.performance.config";
import { PLUGIN_CONFIG } from "#/build/config/webpack.plugin.config";
import { RESOLVE_CONFIG, RESOLVE_LOADER_CONFIG } from "#/build/config/webpack.resolve.config";
import { STATS_CONFIG } from "#/build/config/webpack.stats.config";

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
  devServer: DEV_SERVER_CONFIG,
  devtool: false,
  entry: ENTRY_CONFIG,
  mode: IS_PRODUCTION ? "production" : "development",
  module: MODULE_CONFIG,
  optimization: OPTIMIZATION_CONFIG,
  output: OUTPUT_CONFIG,
  plugins: PLUGIN_CONFIG,
  resolve: RESOLVE_CONFIG,
  resolveLoader: RESOLVE_LOADER_CONFIG,
  stats: STATS_CONFIG,
  performance: PERFORMANCE_CONFIG,
  target: "web",
} as Configuration;

export default WEBPACK_CONFIG;
