/**
 * @module @lib/ts
 */

import * as React from "react";

// Lib.
import { ICustomIntrinsicElements } from "@Lib/components/types";

// Constants.
import * as colors from "@Build/globals/colors";
import * as theme from "@Build/globals/theme";

declare global {

  /**
   * Global definition for dev mode flag.
   */
  const IS_DEV: boolean;

  /**
   * Global definition for test mode flag.
   */
  const IS_TEST: boolean | undefined;

  /**
   * Global definition for react jsx factories.
   */
  const React: typeof React;

  /**
   * Global colors definitions for build time evaluation.
   */
  const GColor: typeof colors;

  /**
   * Global colors definitions for build time evaluation.
   */
  const GTheme: typeof theme;

  /**
   * Declare JSX elements to globals.
   */
  namespace JSX {

    // tslint:disable-next-line
    interface IntrinsicElements extends ICustomIntrinsicElements {
    }
  }
}
