/**
 * @module @application/home
 */

import { LazyExoticComponent } from "react";

// Lib.
import { getLazy } from "@Lib/utils";

export const HomeModule: LazyExoticComponent<any> = getLazy(
  () => import(
    /* webpackChunkName: "module@home" */
    /* webpackPreload: undefined */
    "./HomeRouter"
  )
);
