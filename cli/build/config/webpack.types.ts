export interface IModuleDefinition {
  name: string;
  folder: string;
  path: Array<string> | string;
  title: string;
}

export interface IModulesDefinition {
  modules: Array<IModuleDefinition>;
}

export type TEnvironmentType = ("development" | "production" | "test");
