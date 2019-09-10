import { lazy, LazyExoticComponent, } from "react";

import { IStringIndexed } from "@Lib/ts";

export const getLazy = (importFunc: () => Promise<any>): LazyExoticComponent<any> => (
  lazy(() => importFunc().then((module: IStringIndexed<any>) => ({ default: module[Object.keys(module)[0]] })))
);
