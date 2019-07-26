import * as path from "path";
import { Options } from "webpack";

export type TEnvironmentType = ("development" | "production");

export const ENVIRONMENT: TEnvironmentType = process.env.NODE_ENV as TEnvironmentType;
export const IS_PRODUCTION: boolean = (ENVIRONMENT === "production");

export const TARGET: "web" = "web";
export const PROJECT_ROOT_PATH: string = path.resolve(__dirname, "../../../");
export const ENTRY_FILE_PATH: string = path.resolve(PROJECT_ROOT_PATH, "src/application/Application.ts");
export const INIT_FILE_PATH: string = path.resolve(PROJECT_ROOT_PATH, "src/application/initialization/index.ts");
export const PROJECT_OUTPUT_PATH: string = path.resolve(PROJECT_ROOT_PATH, "target/dist/");
export const TS_CONFIG_PATH: string = path.resolve(PROJECT_ROOT_PATH, "src/tsconfig.json");
export const BUILD_CONFIGURATION_PATH = path.resolve(PROJECT_ROOT_PATH, "cli/build");

export const STATS: Options.Stats = {
  assets: true,
  children: true,
  chunkModules: true,
  chunks: true,
  colors: false,
  modules: true,
  timings: true
};

export const DEVELOPMENT_TOOL: Options.Devtool = IS_PRODUCTION ? false : "source-map";
export const BACKEND_PUBLIC_PATH: string = "/";

export const DEV_SERVER_HOST: string = "localhost";
export const DEV_SERVER_PORT: number = 3000;
export const DEV_SERVER_CONTENT_BASE: string = "target/dist/";
