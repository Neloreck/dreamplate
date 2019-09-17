/**
 * @module @application/home
 */

import { LazyExoticComponent } from "react";

// Lib.
import { getLazyModule } from "@Lib/utils";

export const HomeModule: LazyExoticComponent<any> = getLazyModule(() => import("./HomeRouter"));
