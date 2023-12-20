import { Configuration } from "webpack";

import { BACKEND_PUBLIC_PATH, PROJECT_DIST_PATH } from "./webpack.constants";

export const OUTPUT_CONFIG: Configuration["output"] = {
  chunkFilename: "js/[name]_[chunkhash:8].js",
  filename: "js/[name]_[fullhash].js",
  path: PROJECT_DIST_PATH,
  publicPath: BACKEND_PUBLIC_PATH,
};
