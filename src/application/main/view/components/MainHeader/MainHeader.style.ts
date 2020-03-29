/**
 * @packageDocumentation
 * @module @application/main
 */

import { createUseStyles } from "react-jss";

// Lib.
import { IApplicationTheme } from "@Lib/theme";

export const useStyles = createUseStyles(({ palette, spacing }: IApplicationTheme) => ({
  root: {
    "& > custom-heading": {
      color: GColor.BLACK,
      cursor: "default"
    },
    alignSelf: "normal",
    background: palette.primary.dark,
    boxShadow: "0px 2px 4px -1px rgba(0, 0, 0, 0.25), 0px 4px 5px 0px rgba(0, 0, 0, 0.15), 0px 1px 10px 0px rgba(0, 0, 0, 0.10)",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: spacing.unit * 15,
    padding: `${spacing.unit * 2}px ${spacing.unit * 4}px`,
    position: "relative",
    transitionDuration: "250ms"
  }
}));
