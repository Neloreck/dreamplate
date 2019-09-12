/**
 * @module initialization
 *
 * Inline theme initialization script.
 * Tries to get theme config and apply it to global body/meta.
 */

/* tslint:disable: no-console */

import { IApplicationTheme } from "@Lib/theme";
import { Optional } from "@Lib/ts";

/**
 * Try to parse local storage-encrypted configs (if it is enabled).
 * Apply theme to body.
 */
export const initTheme = () => {

  try {

    const rawStr: Optional<string> = localStorage.getItem(btoa("theme")) || null;

    if (rawStr) {

      const theme: IApplicationTheme = JSON.parse(atob(rawStr));

      document.body.style.backgroundColor = theme.palette.background.default;
      document.body.style.color = theme.palette.text.primary;
      document.head.getElementsByTagName("meta")["theme-color" as any].content = theme.palette.primary.main;
    }

  } catch (error) {
    /* <dev> */
    console.error("Failed to pre-init default theme:", error);
    /* </dev> */
  }
};
