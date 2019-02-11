/* tslint:disable: no-console */
import { Logger } from "./Logger";

describe("Application Logger behaviour.", () => {

  it("Should have proper prefixing for messages and prefixing concatenation.", () => {

    let log: Logger = new Logger("[Prefix]");
    console.info = jest.fn((...args: Array<any>) => expect(args[0]).toBe("%c[Prefix]"));
    log.info("Something.");

    log = log.getPrefixed("[Another]");
    console.info = jest.fn((...args: Array<any>) => expect(args[0]).toBe("%c[Prefix] [Another]"));
    log.info("Something");
  });

});
