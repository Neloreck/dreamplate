/**
 * @module @lib
 */

import { lazy, LazyExoticComponent, } from "react";

import { IStringIndexed } from "@Lib/ts";

/**
 * Create lazy react component and get non-default export from this file.
 * If named imports will be needed - modify it.
 */
export const getLazy = (importFunc: () => Promise<any>): LazyExoticComponent<any> => (
  lazy(() => importFunc().then((module: IStringIndexed<any>) => ({ default: module[Object.keys(module)[0]] })))
);
