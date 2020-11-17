import type * as colors from "@Build/globals/colors";
import type * as theme from "@Build/globals/theme";
import type * as GlobalReact from "react";

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
  const React: typeof GlobalReact;

  /**
   * Global colors definitions for build time evaluation.
   */
  const GColor: typeof colors;

  /**
   * Global colors definitions for build time evaluation.
   */
  const GTheme: typeof theme;
}
