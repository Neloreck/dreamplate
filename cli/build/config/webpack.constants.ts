import * as path from "path";

import { EWebpackFlag } from "#/build/config/webpack.flags";
import { IModulesDefinition, TEnvironmentType } from "#/build/config/webpack.types";
import * as colors from "#/globals/colors";
import * as theme from "#/globals/theme";
import { asConstantsObject } from "#/globals/utils";

/**
 * Environment configuration.
 */

export const ENVIRONMENT: TEnvironmentType = process.env.NODE_ENV as TEnvironmentType;
export const IS_TEST: boolean = ENVIRONMENT === "test";
export const IS_PRODUCTION: boolean = ENVIRONMENT === "production" || IS_TEST;

/**
 * Project paths configuration.
 */

export const PROJECT_ROOT_PATH: string = path.resolve(__dirname, "../../../");
export const CLI_PATH: string = path.resolve(PROJECT_ROOT_PATH, "cli");
export const SRC_PATH: string = path.resolve(PROJECT_ROOT_PATH, "src");

export const BUILD_CONFIGURATION_PATH: string = path.resolve(PROJECT_ROOT_PATH, "cli/build");

export const MODULES_ROOT_PATH: string = path.resolve(PROJECT_ROOT_PATH, "src/application/modules");
export const INITIALIZATION_ROOT_PATH: string = path.resolve(PROJECT_ROOT_PATH, "src/application/initialization");

export const PROJECT_OUTPUT_PATH: string = path.resolve(PROJECT_ROOT_PATH, "target/");
export const PROJECT_DIST_PATH: string = path.resolve(PROJECT_OUTPUT_PATH, "dist/");

export const DOTENV_CONFIG_PATH: string = path.resolve(BUILD_CONFIGURATION_PATH, `env/.${ENVIRONMENT}.env`);
export const TS_CONFIG_PATH: string = path.resolve(PROJECT_ROOT_PATH, "src/tsconfig.json");
export const ESLINT_CONFIG_PATH: string = path.resolve(PROJECT_ROOT_PATH, ".eslintrc.json");
export const ESLINT_IGNORE_PATH: string = path.resolve(PROJECT_ROOT_PATH, ".eslintignore");
export const BASE_PROJECT_TEMPLATE_PATH: string = path.resolve(BUILD_CONFIGURATION_PATH, "template/base.hbs");
export const BASE_PROJECT_FAVICON_PATH: string = path.resolve(BUILD_CONFIGURATION_PATH, "template/favicon.ico");
export const BASE_PROJECT_STATIC_PATH: string = path.resolve(SRC_PATH, "public");

export const BASE_PROJECT_STATIC_FILES: Array<string> = [
  path.resolve(BUILD_CONFIGURATION_PATH, "public/robots.txt"),
  path.resolve(BUILD_CONFIGURATION_PATH, "public/manifest.json"),
];

export const BACKEND_PUBLIC_PATH: string = "/";

/**
 * Flags configuration.
 */

export const IS_ANALYZE_ENABLED: boolean = process.env[EWebpackFlag.ANALYZE] === "true";
export const REPORT_BUNDLE_ANALYZER_PATH: string = path.resolve(PROJECT_OUTPUT_PATH, "info/report.html");
export const REPORT_BUNDLE_STATS_PATH: string = "../info/report.json";

export const IS_PROFILING_ENABLED: boolean = process.env[EWebpackFlag.PROFILE] === "true";

/**
 * Globals configuration.
 */

export const RUNTIME_CONSTANTS = {
  IS_DEV: !IS_PRODUCTION,
  IS_TEST,
  // Build time constants for inlining.
  GColor: asConstantsObject(colors),
  GTheme: asConstantsObject(theme),
};

export const PROJECT_CORE_DEPENDENCIES: Array<string> = [
  "react",
  "react-dom",
  "loose-envify",
  "object-assign",
  "scheduler",
];

export const PROJECT_INLINE_MODULES: Array<string | RegExp> = [
  /.*\/initialization.*/, // Critical application code for inlining.
  /.*\/runtime.*$/, // Webpack runtime support.
];

export const MAX_CORE_CHUNK_SIZE: number = IS_PRODUCTION ? 500 * 1000 : 3000 * 1000;

/**
 * Dev server configuration.
 */

export const DEV_SERVER_HOST: string = "0.0.0.0";
export const DEV_SERVER_PORT: number = 3000;
export const DEV_SERVER_CONTENT_BASE: string = PROJECT_DIST_PATH;
export const DEV_SERVER_REFRESH: boolean = process.env.REFRESH === "true";

/**
 * Project modules config.
 */

// Entries that will always be built.
export const REQUIRED_ENTRIES: Array<string> = ["error"];

export const SELECTED_ENTRIES: Array<string> | null = process.env[EWebpackFlag.ENTRIES]
  ? JSON.parse(process.env[EWebpackFlag.ENTRIES] as string)
  : null;

export const MODULES_CONFIG: IModulesDefinition = (() => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const config = require(path.resolve(MODULES_ROOT_PATH, "modules.json"));

  if (SELECTED_ENTRIES) {
    // Check if requested modules exist.
    SELECTED_ENTRIES.forEach((it: string) => {
      if (config.modules.some((module: { name: string }) => module.name === it)) {
        return;
      } else {
        throw new Error("Requested module was not declared in modules.json file: " + it);
      }
    });

    // Select only requested modules.
    config.modules = config.modules.filter((it: { name: string }) =>
      SELECTED_ENTRIES.concat(REQUIRED_ENTRIES).includes(it.name));
  }

  return config;
})();
