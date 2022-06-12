import * as path from "path";

import { Configuration } from "webpack";

import { BUILD_CONFIGURATION_PATH, PROJECT_ROOT_PATH, CLI_PATH, IS_PROFILING_ENABLED } from "./webpack.constants";

export const RESOLVE_CONFIG: Configuration["resolve"] = {
  alias: {
    "#": path.resolve(BUILD_CONFIGURATION_PATH, "./"),
    "@": path.resolve(PROJECT_ROOT_PATH, "src/application/"),
    /**
     * React DOM profiling mode switcher.
     */
    "react-dom$": IS_PROFILING_ENABLED ? "react-dom/profiling" : "react-dom"
  },
  extensions: [ ".ts", ".tsx", ".js", ".jsx", ".json" ],
  modules: [ "node_modules" ]
};

console.error("GOT", RESOLVE_CONFIG.alias);

export const RESOLVE_LOADER_CONFIG: Configuration["resolveLoader"] = {
  modules: [ path.resolve(CLI_PATH, "node_modules") ]
};
