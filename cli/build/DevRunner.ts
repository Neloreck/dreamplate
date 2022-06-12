import { green } from "colors";
import { default as Webpack, Compiler } from "webpack";
import { default as DevServer } from "webpack-dev-server";

import { Run } from "../utils";

import { setupEnvironmentFlags } from "./globals/setup_environment";

@Run()
export class DevRunner {

  /**
   * Possible args:
   *   - List of modules to serve
   *   - Arguments like '--profile' and '--analyze'
   */
  public static main(args: Array<string>): void {
    const { entries, flags } = setupEnvironmentFlags(args);

    const { WEBPACK_CONFIG, PROJECT_ROOT_PATH, PROJECT_OUTPUT_PATH } = require("./config");
    const compiler: Compiler = Webpack(WEBPACK_CONFIG);
    const server = new DevServer(WEBPACK_CONFIG.devServer, compiler);

    server.start();

    process.stdout.write(
      `\nStarted dev server for client bundle in ${green(process.env.NODE_ENV || "unselected")} mode. \n` +
        `Project root: '${green(PROJECT_ROOT_PATH)}'.\n` +
        `Project output: '${green(PROJECT_OUTPUT_PATH)}'.\n` +
        (entries ? `Modules for serving: ${green(JSON.stringify(entries))}.\n` : "\n") +
        (flags ? `Flags for serving: ${green(JSON.stringify(flags))}.\n` : "\n")
    );
  }

}
