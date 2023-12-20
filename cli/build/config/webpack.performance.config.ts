import { Configuration } from "webpack";

import { IS_PRODUCTION } from "./webpack.constants";

export const PERFORMANCE_CONFIG: Configuration["performance"] = {
  hints: IS_PRODUCTION ? "warning" : false,
  maxEntrypointSize: 512 * 1000,
};
