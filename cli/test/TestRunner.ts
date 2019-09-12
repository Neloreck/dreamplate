// @ts-ignore
import * as jest from "jest";

import { EntryPoint } from "../_cli";
import { JEST_CONFIG } from "./config/jest.config";

@EntryPoint()
export class TestRunner {

  public static async main(args: Array<string>): Promise<void> {

    process.stdout.write(`\nStarting jest testing. \n\n`);

    await jest.run([...args.slice(2), "--all", "--config", JSON.stringify(JEST_CONFIG), "--detectOpenHandles"]);
  }

}
