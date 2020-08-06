import { Options } from "webpack";

import { IS_PRODUCTION } from "./webpack.constants";

export const PERFORMANCE_CONFIG: Options.Performance = {
  hints: IS_PRODUCTION ? "warning" : false,
  maxEntrypointSize: 350_000
};
