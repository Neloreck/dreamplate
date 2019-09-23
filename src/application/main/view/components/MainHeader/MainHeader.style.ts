/**
 * @module @application/main
 */

import { IApplicationTheme, WHITE } from "@Lib/theme";

export const mainHeaderStyle = ({ palette, spacing }: IApplicationTheme) => ({
  root: {
    "& > custom-heading": {
      "-webkit-text-stroke": "1px black",
      color: WHITE,
      cursor: "default"
    },
    alignSelf: "normal",
    background: palette.primary.dark,
    boxShadow: `0px 2px 4px -1px rgba(0, 0, 0, 0.25), 0px 4px 5px 0px rgba(0, 0, 0, 0.15), 0px 1px 10px 0px rgba(0, 0, 0, 0.10)`,
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: `${spacing.unit * 2}px ${spacing.unit * 4}px`,
    position: "relative",
    transitionDuration: "250ms"
  }
});
