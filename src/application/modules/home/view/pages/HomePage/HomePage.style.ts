/**
 * @module @application/home
 */

import { IApplicationTheme } from "@Lib/theme";

export const homePageStyle = ({ palette, spacing }: IApplicationTheme) => ({
  cardLink: {
    "& a": {
      color: palette.text.primary,
    },
    backgroundColor: palette.background.paper,
    display: "flex",
    justifyContent: "center",
    minWidth: spacing.unit * 15,
    transitionDuration: "500ms"
  },
  content: {
    alignSelf: "normal",
    alignItems: "center",
    backgroundColor: palette.background.default,
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "center",
    overflowY: "auto",
    transitionDuration: "350ms"
  },
  linkCards: {
    display: "flex",
    flexDirection: "row",
    padding: spacing.unit * 10
  }
});
