/**
 * @module @application/home
 */

import { IApplicationTheme } from "@Lib/theme";

export const homePageStyle = ({ palette, spacing }: IApplicationTheme) => ({
  card: {
    "& a": {
      color: palette.text.primary,
      transitionDuration: "750ms"
    },
    backgroundColor: palette.background.paper,
    boxShadow: "0px 2px 4px -1px rgba(0, 0, 0, 0.25), 0px 4px 5px 0px rgba(0, 0, 0, 0.15), 0px 1px 10px 0px rgba(0, 0, 0, 0.10)",
    margin: spacing.unit * 4,
    transitionDuration: "500ms",
    padding: spacing.unit * 3
  },
  content: {
    alignSelf: "normal",
    alignItems: "center",
    backgroundColor: palette.background.default,
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "center",
    overflowY: "auto",
    transitionDuration: "350ms"
  }
});
