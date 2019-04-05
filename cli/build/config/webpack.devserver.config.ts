import { Configuration } from "webpack-dev-server";

import {
  BACKEND_PUBLIC_PATH,
  DEV_SERVER_CONTENT_BASE,
  DEV_SERVER_HOST,
  DEV_SERVER_PORT,
  IS_PRODUCTION
} from "./webpack.constants";

export const DEV_SERVER_CONFIG: Configuration = {
  compress: IS_PRODUCTION,
  contentBase: DEV_SERVER_CONTENT_BASE,
  headers: IS_PRODUCTION ? { "Cache-Control": "public,max-age=31536000" } : undefined,
  historyApiFallback: true,
  host: DEV_SERVER_HOST,
  hot: !IS_PRODUCTION,
  https: true,
  inline: !IS_PRODUCTION,
  port: DEV_SERVER_PORT,
  publicPath: BACKEND_PUBLIC_PATH
};
