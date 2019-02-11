import {EntryPoint} from "@redux-cbd/utils";
// @ts-ignore
import * as jest from "jest";
import {JEST_CONFIG} from "./config/jest.config";

@EntryPoint()
export class TestRunner {

  public static main(args: Array<string>): void {
    process.stdout.write(`Starting testing. \n`);
    jest.run([...args.slice(2), "--all", "--config", JSON.stringify(JEST_CONFIG), "--detectOpenHandles"]);
  }

}
