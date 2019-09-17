/**
 * @module @application/home
 */

import { LazyExoticComponent } from "react";

// Lib.
import { getLazyModule } from "@Lib/utils";

export const HomePage: LazyExoticComponent<any> = getLazyModule(() => import("./HomePage.component"));

export { IHomePageInjectedProps } from "./HomePage.component";
