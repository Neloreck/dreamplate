/**
 * @module @application/home
 */

import { IApplicationTheme } from "@Lib/theme";

export const homePageStyle = ({ palette }: IApplicationTheme) => ({
  cardLink: {
    "& a": {
      color: palette.text.primary,
    },
    backgroundColor: palette.background.paper,
    transitionDuration: "500ms"
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
