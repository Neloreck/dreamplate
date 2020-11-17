import { WebpackOptionsNormalized } from "webpack";

import { IS_PRODUCTION } from "./webpack.constants";

export const PERFORMANCE_CONFIG: WebpackOptionsNormalized["performance"] = {
  hints: IS_PRODUCTION ? "warning" : false,
  maxEntrypointSize: 350_000
};
