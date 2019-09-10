import { Entry, Output } from "webpack";

import {
  BACKEND_PUBLIC_PATH,
  ENTRY_FILE_PATH, INIT_FILE_PATH,
  IS_PRODUCTION, PROJECT_OUTPUT_PATH
} from "./webpack.constants";

export const IO_CONFIG: {
  ENTRY: Entry | Array<string>,
  OUTPUT: Output
} = {
  ENTRY: IS_PRODUCTION
    ? { application: ENTRY_FILE_PATH, init: INIT_FILE_PATH }
    : { application: [ "react-hot-loader/patch", ENTRY_FILE_PATH ], init: INIT_FILE_PATH },
  OUTPUT: {
    chunkFilename: "js/c:[name].js",
    filename: "js/f:[name].js",
    path: PROJECT_OUTPUT_PATH,
    publicPath: BACKEND_PUBLIC_PATH,
    sourceMapFilename: "js/maps/[name].js.map"
  }
};
