/**
 * @module  @lib/utils
 */

import { Logger } from "@Lib/utils";
import { Callable, IStringIndexed } from "@Lib/ts";

describe("Application Logger behaviour.", () => {

  const EXPECTED_HASHES_MAP: IStringIndexed<number> = {
    "FIRST_CHECK": -1931411847,
    "SECOND_CHECK": -1438293667,
    "THIRD_CHECK": -798192656
  };

  expect(IS_DEV).toBeFalsy();

  it("Should not affect console output in production environment.", () => {

    let log: Logger = new Logger("Test");

    console.log = jest.fn();
    console.info = jest.fn();
    console.error = jest.fn();
    console.debug = jest.fn();
    console.group = jest.fn();
    console.groupEnd = jest.fn();

    log.info("1");
    log.error("1");
    log.debug("1");
    log.group("1");
    log.groupEnd();

    expect(console.log).not.toHaveBeenCalled();
    expect(console.info).not.toHaveBeenCalled();
    expect(console.error).not.toHaveBeenCalled();
    expect(console.debug).not.toHaveBeenCalled();
    expect(console.group).not.toHaveBeenCalled();
    expect(console.groupEnd).not.toHaveBeenCalled();
  });

  it("Always generate same hashes for same strings.", () => {

    let log: Logger = new Logger("Test");

    // @ts-ignore protected internals usage.
    const generator: Callable = log["getHashCode"];

    for (const [ key, value ] of Object.entries(EXPECTED_HASHES_MAP)) {
      expect(generator(key)).toBe(value);
    }
  });
});
