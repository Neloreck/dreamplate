import { green, red } from "colors";

import * as cliConfig from "../cli.json";

const DEFAULT_SCRIPTS_SEPARATOR: string = "=";

const cmdArgs: Array<string> = process.argv.slice(2);
const scripts: Array<string> = cmdArgs.length
  ? cmdArgs
  : Object
    .keys(cliConfig.scripts)
    .sort((a: string, b: string) => (a === b ? 0 : (a > b ? 1 : -1)))
    .filter((it: string) => it.replace(new RegExp(`[^${DEFAULT_SCRIPTS_SEPARATOR}]`, "g"),"").length < 5);

process.stdout.write(`To run any script use '${green("./run <script>")}' in project root dir.\n`);
process.stdout.write(`To add any script edit '${green("./cli/cli.json")}' file and add new Runner if needed.\n\n`);

scripts.forEach((it: string, index: number) => {
  const executablePart = (cliConfig.scripts as { [name: string]: any })[it];

  if (!executablePart) {
    process.stdout.write(`${index + 1}) ${red(it)}\n  - script not found \n`);

    return;
  }

  if (executablePart.private) {
    return;
  } else {
    process.stdout.write(`${index + 1}) ${green(it)} \n`);

    if (typeof executablePart === "object" && executablePart.description) {
      process.stdout.write(`  - ${executablePart.description}\n`);
    } else {
      process.stdout.write("  - no description\n");
    }
  }
});
