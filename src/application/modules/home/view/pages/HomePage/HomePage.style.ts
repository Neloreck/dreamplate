import { IApplicationTheme } from "@Main/data/store/theme/ThemeTypes";

export const homePageStyle = ({ palette, spacing }: IApplicationTheme) => ({
  card: {
    "& a": {
      color: palette.text.primary,
    },
    backgroundColor: palette.background.paper,
    margin: spacing.unit * 2,
    padding: spacing.unit * 2
  },
  content: {
    alignItems: "center",
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "center",
    overflowY: "auto",
    width: "100%"
  },
  root: {
    backgroundColor: palette.background.default,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    transitionDuration: "250ms",
    width: "100%"
  }
});
