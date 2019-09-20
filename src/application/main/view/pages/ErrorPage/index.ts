/**
 * @module @application/main
 */

import { LazyExoticComponent } from "react";

// Lib.
import { getLazyModule } from "@Lib/utils";

export const ErrorPage: LazyExoticComponent<any> = getLazyModule(() => import(
  /* webpackChunkName: "main@error-page" */
  "./ErrorPage.component"
));

export { IErrorPageInjectedProps } from "./ErrorPage.component";
