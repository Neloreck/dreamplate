import { green, red } from "colors";
import { default as Webpack, Compiler } from "webpack";

import { Run } from "../utils";

@Run()
export class BuildRunner {

  public static readonly STATS_PRINT_CONFIG: Record<string, any> = { colors: true };

  public static main(args: Array<string>): void {
    const entries: Array<string> = args.slice(2).filter((it: string) => it);
    const hasDefinedEntries: boolean = entries.length !== 0;

    /**
     * Handle entries selection for optional serving.
     */
    if (hasDefinedEntries) {
      process.env.ENTRIES = JSON.stringify(entries);
    }

    const { PROJECT_OUTPUT_PATH, PROJECT_ROOT_PATH, WEBPACK_CONFIG } = require("./config");
    const compiler: Compiler = Webpack(WEBPACK_CONFIG);

    process.stdout.write(
      `Started building client bundle in ${green(process.env.NODE_ENV || "unselected")} mode.\n\n` +
        `Project root: '${green(PROJECT_ROOT_PATH)}'.\n` +
        `Project output: '${green(PROJECT_OUTPUT_PATH)}'.\n` +
        (hasDefinedEntries ? `Modules for serving: ${green(JSON.stringify(entries))}.\n\n` : "\n")
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
