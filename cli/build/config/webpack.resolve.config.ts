import * as path from "path";

import { Configuration } from "webpack";

import { CLI_PATH, IS_PROFILING_ENABLED, PROJECT_ROOT_PATH } from "./webpack.constants";

export const RESOLVE_CONFIG: Configuration["resolve"] = {
  alias: {
    "#": path.resolve(CLI_PATH, "./"),
    "@": path.resolve(PROJECT_ROOT_PATH, "src/application/"),
    /**
     * React DOM profiling mode switcher.
     */
    "react-dom$": IS_PROFILING_ENABLED ? "react-dom/profiling" : "react-dom",
  },
  extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  modules: ["node_modules"],
};

export const RESOLVE_LOADER_CONFIG: Configuration["resolveLoader"] = {
  modules: [path.resolve(CLI_PATH, "node_modules")],
};
