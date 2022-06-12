import { green } from "colors";
import { default as Webpack, Compiler } from "webpack";
import { default as DevServer } from "webpack-dev-server";

import { WEBPACK_CONFIG } from "#/config";

import { Run } from "../utils";

@Run()
export class DevRunner {

  public static main(args: Array<string>): void {
    const entries: Array<string> = args.slice(2).filter((it: string) => it);
    const hasDefinedEntries: boolean = entries.length !== 0;

    /**
     * Handle entries selection for optional serving.
     */
    if (hasDefinedEntries) {
      process.env.ENTRIES = JSON.stringify(entries);
    }

    const { WEBPACK_CONFIG, PROJECT_ROOT_PATH, PROJECT_OUTPUT_PATH } = require("./config");
    const compiler: Compiler = Webpack(WEBPACK_CONFIG);
    const server = new DevServer(WEBPACK_CONFIG.devServer, compiler);

    server.start();

    process.stdout.write(
      `\nStarted dev server for client bundle in ${green(process.env.NODE_ENV || "unselected")} mode. \n` +
        `Project root: '${green(PROJECT_ROOT_PATH)}'.\n` +
        `Project output: '${green(PROJECT_OUTPUT_PATH)}'.\n` +
        (hasDefinedEntries ? `Modules for serving: ${green(JSON.stringify(entries))}.\n\n` : "\n")
    );
  }

}
