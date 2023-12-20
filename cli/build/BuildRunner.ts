import { green, red } from "colors";
import { Compiler, default as Webpack } from "webpack";

import { Run } from "../utils";

import { setupEnvironmentFlags } from "./globals/setup_environment";

@Run()
export class BuildRunner {
  public static readonly STATS_PRINT_CONFIG: Record<string, any> = { colors: true };

  /**
   * Possible args:
   *   - List of modules to build
   *   - Arguments like '--profile' and '--analyze'
   */
  public static main(args: Array<string>): void {
    const { entries, flags } = setupEnvironmentFlags(args);

    const { PROJECT_OUTPUT_PATH, PROJECT_ROOT_PATH, WEBPACK_CONFIG } = require("./config");
    const compiler: Compiler = Webpack(WEBPACK_CONFIG);

    process.stdout.write(
      `Started building client bundle in ${green(process.env.NODE_ENV || "unselected")} mode.\n\n` +
        `Project root: '${green(PROJECT_ROOT_PATH)}'.\n` +
        `Project output: '${green(PROJECT_OUTPUT_PATH)}'.\n` +
        (entries ? `Modules for serving: ${green(JSON.stringify(entries))}.\n` : "\n") +
        (flags ? `Flags for serving: ${green(JSON.stringify(flags))}.\n` : "\n")
    );

    compiler.run((error: any, stats: any): void => {
      if (error) {
        process.stdout.write(
          red("\nFailed to build client bundle: " + "\n" + error.toString(BuildRunner.STATS_PRINT_CONFIG) + "\n")
        );
      } else {
        process.stdout.write(
          green("\nSuccessfully built client bundle: " + "\n" + stats.toString(BuildRunner.STATS_PRINT_CONFIG) + "\n")
        );
      }
    });
  }
}
