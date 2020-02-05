import { green } from "colors";
import * as cliConfig from "../cli.json";

const DEFAULT_SCRIPTS_SEPARATOR: string = "=";

const scripts: Array<string> = Object
  .keys(cliConfig.scripts)
  .sort((a: string, b: string) => (a === b ? 0 : (a > b ? 1 : -1)))
  .filter((it: string) => it.replace(new RegExp(`[^${DEFAULT_SCRIPTS_SEPARATOR}]`, "g"),'').length < 5);

process.stdout.write("\n");

scripts.forEach((it: string, index: number) => {

  const executablePart = cliConfig.scripts[it];

  process.stdout.write(`${index + 1}) ${green(it)} \n`);

  if (typeof executablePart === "object" && executablePart.description) {
    process.stdout.write(`  - ${executablePart.description}\n`);
  }
});
