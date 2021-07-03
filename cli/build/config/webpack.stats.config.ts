import { Configuration } from "webpack";

export const STATS_CONFIG: Configuration["stats"] = {
  assets: true,
  children: false,
  chunkModules: false,
  chunks: false,
  colors: true,
  modules: false,
  timings: true
};
