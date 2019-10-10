/**
 * @module @initialization
 */

/* tslint:disable: no-console */

// Lib.
import { BLACK, LIGHT_BLACK, WHITE } from "@Lib/theme/colors";
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

      document.body.style.backgroundColor = (theme === "dark" ? LIGHT_BLACK : WHITE);
      document.body.style.color = (theme === "dark" ? WHITE : BLACK);
    }
  } catch (error) {
    /* <dev> */
    /* tslint:disable: no-console */
    console.error("Failed to pre-init default theme:", error);
    /* </dev> */
  }
};
