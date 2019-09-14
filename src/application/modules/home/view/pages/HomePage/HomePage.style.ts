/**
 * @module @application/home
 */

import { IApplicationTheme } from "@Lib/theme";

export const homePageStyle = ({ palette }: IApplicationTheme) => ({
  card: {
    "& a": {
      color: palette.text.primary,
      transitionDuration: "750ms"
    },
    backgroundColor: palette.background.paper
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
