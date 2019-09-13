/**
 * @module @lib
 */

import * as React from "react";

declare global {

  /**
   * Global definition for dev mode flag.
   */
  const IS_DEV: boolean;

  /**
   * Global definition for react jsx factories.
   */
  const React: typeof React;
}
