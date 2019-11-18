/**
 * @module @application/home
 */

import { down, IApplicationTheme } from "@Lib/theme";

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
  },
  linkCards: {
    [down("sm")]: {
      flexDirection: "column"
    },
    display: "flex",
    flexDirection: "row",
    padding: spacing.unit * 10
  }
});
