import * as path from "path";

export interface IModuleDefinition {
  name: string;
  folder: string;
  path: Array<string> | string;
  title: string;
}

export interface IModulesDefinition {
  modules: Array<IModuleDefinition>;
}

export type TEnvironmentType = ("development" | "production");

export const ENVIRONMENT: TEnvironmentType = process.env.NODE_ENV as TEnvironmentType;
export const IS_PRODUCTION: boolean = (ENVIRONMENT === "production");

export const RUNTIME_CONSTANTS = {
  IS_DECORATOR_ENABLED: true,
  IS_DEV: !IS_PRODUCTION
};

export const PROJECT_ROOT_PATH: string = path.resolve(__dirname, "../../../");
export const MODULES_ROOT_PATH: string = path.resolve(PROJECT_ROOT_PATH, "src/application/modules");
export const INITIALIZATION_ROOT_PATH: string = path.resolve(PROJECT_ROOT_PATH, "src/application/initialization");
export const PROJECT_OUTPUT_PATH: string = path.resolve(PROJECT_ROOT_PATH, "target/dist/");

export const SELECTED_ENTRIES: Array<string> | null = process.env.ENTRIES ? JSON.parse(process.env.ENTRIES) : null;
export const TS_CONFIG_PATH: string = path.resolve(PROJECT_ROOT_PATH, "src/tsconfig.json");
export const BUILD_CONFIGURATION_PATH = path.resolve(PROJECT_ROOT_PATH, "cli/build");

export const BACKEND_PUBLIC_PATH: string = "/";

export const DEV_SERVER_HOST: string = "0.0.0.0";
export const DEV_SERVER_PORT: number = 3000;
export const DEV_SERVER_CONTENT_BASE: string = path.resolve(PROJECT_ROOT_PATH, "target/dist/");

export const MODULES_CONFIG: IModulesDefinition = (() => {

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
    config.modules = config.modules.filter((it: { name: string }) => SELECTED_ENTRIES.includes(it.name));
  }

  return config;
})();
