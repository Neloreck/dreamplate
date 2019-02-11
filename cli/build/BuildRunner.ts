import { EntryPoint } from "@redux-cbd/utils";
import { green, red } from "colors";
import { Compiler, default as webpack } from "webpack";

import { PROJECT_OUTPUT_PATH, PROJECT_ROOT_PATH, WEBPACK_CONFIG } from "./config";

@EntryPoint()
export class BuildRunner {

  public static readonly STATS_PRINT_CONFIG: object = { colors: true };

  public static main(): void {

    const compiler: Compiler = webpack(WEBPACK_CONFIG);

    process.stdout.write(
      `Started building client bundle in ${green(process.env.NODE_ENV || "unselected")} mode. \n` +
      `Project root: '${green(PROJECT_ROOT_PATH)}', project output: '${green(PROJECT_OUTPUT_PATH)}'. \n\n`
    );

    compiler.run((error: any, stats: any): void => {
      if (error) {
        process.stdout.write(red("\nFailed to build client bundle: " + "\n" +
          error.toString(BuildRunner.STATS_PRINT_CONFIG) + "\n"));
      } else {
        process.stdout.write(green("\nSuccessfully built client bundle: " + "\n" +
          stats.toString(BuildRunner.STATS_PRINT_CONFIG) + "\n"));
      }
    });
  }

}
