import * as GlobalReact from "react";

// Constants.
import * as colors from "@Build/globals/colors";
import * as theme from "@Build/globals/theme";

// Lib.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ICustomIntrinsicElements } from "@Lib/components/types";

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

  /**
   * Declare JSX elements to globals.
   */
  namespace JSX {

    interface IntrinsicElements extends ICustomIntrinsicElements {
    }
  }
}
