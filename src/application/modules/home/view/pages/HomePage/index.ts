/**
 * @module @application/home
 */

import { LazyExoticComponent } from "react";

// Lib.
import { getLazy } from "@Lib/utils";

export const HomePage: LazyExoticComponent<any> = getLazy(() => import("./HomePage.component"));

export { IHomePageInjectedProps } from "./HomePage.component";
