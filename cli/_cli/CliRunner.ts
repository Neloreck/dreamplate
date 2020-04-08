import { CommandRunner } from "./CommandRunner";
import { Run } from "./Run";

import * as cliConfig from "../cli.json";

@Run()
export class CliRunner {

  public static readonly scriptsKey: string = "scripts";
  public static readonly configKey: string = "config";

  public static async main(args: Array<string>): Promise<void> {
    // Try to execute provided script or show help instead.
    const cmd: string = args[2] || "help";
    const cmdAdditionalArgs: Array<string> = args.slice(3);

    const script: string | Array<string> = cliConfig[CliRunner.scriptsKey][cmd];
    const config: object = cliConfig[CliRunner.configKey];

    const commandRunner: CommandRunner = new CommandRunner(cmd, cmdAdditionalArgs, script, config);
    await commandRunner
      .run()
      .then(() => process.exit(0))
      .catch(() => process.exit(1));
  }

}
