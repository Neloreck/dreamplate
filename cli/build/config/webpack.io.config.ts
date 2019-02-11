import { Entry, Output } from "webpack";

import {
  BACKEND_PUBLIC_PATH,
  ENTRY_FILE_PATH,
  IS_PRODUCTION, PROJECT_OUTPUT_PATH
} from "./webpack.constants";

export const IO_CONFIG: {
  ENTRY: Entry | Array<string>,
  OUTPUT: Output
} = {
  ENTRY: IS_PRODUCTION
    ? [ENTRY_FILE_PATH]
    : ["webpack/hot/dev-server", ENTRY_FILE_PATH],
  OUTPUT: {
    chunkFilename: "js/chunk:[name].js",
    filename: "js/[name].js",
    path: PROJECT_OUTPUT_PATH,
    publicPath: BACKEND_PUBLIC_PATH,
    sourceMapFilename: "js/map/[name].bundle.map"
  }
};
