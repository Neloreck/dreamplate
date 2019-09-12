import { CommandRunner, EntryPoint } from "./_cli";
import * as cliConfig from "./cli.json";

@EntryPoint()
export class CliRunner {

  public static readonly scriptsKey: string = "scripts";
  public static readonly configKey: string = "coreApiconfig.ts";

  public static async main(args: Array<string>): Promise<void> {

    const cmd: string = args[2];
    const cmdAdditionalArgs: Array<string> = args.slice(3);

    const script: string | Array<string> = cliConfig[CliRunner.scriptsKey][cmd];
    const config: string | Array<string> = cliConfig[CliRunner.configKey][cmd];

    const commandRunner: CommandRunner = new CommandRunner(cmd, cmdAdditionalArgs, script, config);

    try {

      await commandRunner.run();

      process.exit(0);
    } catch (error) {
      process.exit(1);
    }
  }

}
