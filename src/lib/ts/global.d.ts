/**
 * @module @lib/ts
 */

import * as React from "react";

// Lib.
import { ICustomIntrinsicElements } from "@Lib/components/types";

declare global {

  /**
   * Global definition for dev mode flag.
   */
  const IS_DEV: boolean;

  /**
   * Global definition for react jsx factories.
   */
  const React: typeof React;

  /**
   * Declare JSX elements to globals.
   */
  namespace JSX {

    // tslint:disable-next-line
    interface IntrinsicElements extends ICustomIntrinsicElements {
    }
  }
}
