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
