import { createUseStyles } from "react-jss";

// Lib.
import { IApplicationTheme } from "@Lib/theme";
import { down } from "@Macro/style.macro";

export const useStyles = createUseStyles(({ palette, spacing }: IApplicationTheme) => ({
  cardLink: {
    "& a": {
      color: palette.text.primary
    },
    backgroundColor: palette.background.paper,
    display: "flex",
    justifyContent: "center",
    minWidth: spacing.unit * 15
  },
  content: {
    alignItems: "center",
    alignSelf: "stretch",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "center",
    overflowY: "auto"
  },
  linkCard: {
    [down("sm")]: {
      flexDirection: "column"
    },
    display: "flex",
    flexDirection: "row",
    padding: spacing.unit * 10
  }
}));
