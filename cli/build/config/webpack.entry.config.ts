import * as path from "path";

import { Configuration } from "webpack";

import { INITIALIZATION_ROOT_PATH, MODULES_CONFIG, MODULES_ROOT_PATH } from "./webpack.constants";
import { IModulesDefinition } from "./webpack.types";

/**
 * Generate entry-points based on modules.json config.
 */
const generateEntryPoints = (definition: IModulesDefinition) => {
  const entries: Record<string, any> = {};

  for (const entry of definition.modules) {
    entries[entry.name] = path.resolve(MODULES_ROOT_PATH, entry.entry);
  }

  return entries;
};

export const ENTRY_CONFIG: Configuration["entry"] = {
  initialization: {
    import: [ INITIALIZATION_ROOT_PATH ]
  },
  ...generateEntryPoints(MODULES_CONFIG)
};
