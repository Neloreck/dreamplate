/* tslint:disable: no-console */

import { IApplicationTheme } from "@Lib/theme";
import { Optional } from "@Lib/ts";

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
