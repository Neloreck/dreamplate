/**
 * @packageDocumentation
 * @module @application/about
 */

import { createUseStyles } from "react-jss";

// Lib.
import { IApplicationTheme } from "@Lib/theme";

export const useStyles = createUseStyles(({ palette }: IApplicationTheme) => ({
  content: {
    alignItems: "center",
    alignSelf: "normal",
    backgroundColor: palette.background.default,
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "center",
    overflowY: "auto",
    transitionDuration: "350ms"
  }
}));
