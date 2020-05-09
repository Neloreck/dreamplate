import * as path from "path";
import { Entry, Output } from "webpack";

import {
  BACKEND_PUBLIC_PATH,
  INITIALIZATION_ROOT_PATH,
  IS_PRODUCTION,
  MODULES_CONFIG,
  MODULES_ROOT_PATH,
  PROJECT_DIST_PATH
} from "./webpack.constants";
import { IModulesDefinition } from "./webpack.types";

/**
 * Generate entry-points based on modules.json config.
 */
const generateEntryPoints = (definition: IModulesDefinition) => {
  const entries: { [index: string]: any } = {};

  for (const entry of definition.modules) {
    const entryPath: string = path.resolve(MODULES_ROOT_PATH, entry.entry);

    entries[entry.name] = [ entryPath ].concat(IS_PRODUCTION ? [] : [ "react-hot-loader/patch" ]);
  }

  return entries;
};

export const IO_CONFIG: {
  ENTRY: Entry | Array<string>,
  OUTPUT: Output
} = {
  ENTRY: {
    initialization: INITIALIZATION_ROOT_PATH,
    ...generateEntryPoints(MODULES_CONFIG)
  },
  OUTPUT: {
    chunkFilename: "js/[name]_[chunkhash:8].js",
    filename: "js/[name]_[hash:8].js",
    path: PROJECT_DIST_PATH,
    publicPath: BACKEND_PUBLIC_PATH,
    sourceMapFilename: "source_maps/[filebase].map[query]"
  }
};
