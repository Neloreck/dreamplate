/**
 * @module @application/error
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
    flexWrap: "nowrap",
    justifyContent: "center",
    overflowY: "auto",
    transitionDuration: "500ms"
  },
  labelCard: {
    backgroundColor: palette.secondary.light
  }
}));
