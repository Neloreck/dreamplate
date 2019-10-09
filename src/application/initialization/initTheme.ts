/**
 * @module @initialization
 */

/* tslint:disable: no-console */

// Lib.
import {
  DEFAULT_BACKGROUND_DARK,
  DEFAULT_BACKGROUND_LIGHT,
  DEFAULT_PRIMARY_MAIN,
  DEFAULT_TEXT_PRIMARY_DARK,
  DEFAULT_TEXT_PRIMARY_LIGHT,
} from "@Lib/theme/theming";
import { TThemeType } from "@Lib/theme/types";
import { Optional } from "@Lib/ts";

/**
 * Try to parse local storage-encrypted configs (if it is enabled).
 * Apply theme to body.
 */
export const initTheme = () => {

  try {

    const rawStr: Optional<string> = localStorage.getItem(btoa("theme")) || null;

    if (rawStr) {

      const theme: TThemeType = JSON.parse(atob(rawStr));

      document.body.style.backgroundColor = (theme === "dark" ? DEFAULT_BACKGROUND_DARK : DEFAULT_BACKGROUND_LIGHT);
      document.body.style.color = (theme === "dark" ? DEFAULT_TEXT_PRIMARY_DARK : DEFAULT_TEXT_PRIMARY_LIGHT);
      document.head.getElementsByTagName("meta")["theme-color" as any].content = DEFAULT_PRIMARY_MAIN;
    }

  } catch (error) {
    /* <dev> */
    /* tslint:disable: no-console */
    console.error("Failed to pre-init default theme:", error);
    /* </dev> */
  }
};
