/**
 * @packageDocumentation
 * @module @lib/utils
 */

import { FunctionComponent, lazy } from "react";

// Lib.
import { IStringIndexed } from "@Lib/ts";

/**
 * Create lazy react component and get non-default export from this file.
 * If named imports will be needed - modify it.
 *
 * Warning: only one export from files expected.
 */
export const getLazyModule = (importFunc: () => Promise<any>): FunctionComponent<any> => (
  lazy(() => importFunc().then((module: IStringIndexed<any>) => ({ default: module[Object.keys(module)[0]] }) as any))
);
