// @ts-ignore
import * as jest from "jest";

import { JEST_CONFIG } from "./config/jest.config";
import { Run } from "../_cli";

@Run()
export class TestRunner {

  public static async main(args: Array<string>): Promise<void> {

    process.stdout.write(`Starting jest testing. \n\n`);

    await jest.run([
      ...args.slice(2),
      "--all",
      "--config", JSON.stringify(JEST_CONFIG),
      "--detectOpenHandles"
    ]);
  }

}
