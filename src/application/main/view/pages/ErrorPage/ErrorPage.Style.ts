import { IApplicationTheme } from "@Main/data/store/theme/ThemeTypes";

export const errorPageStyle = ({ palette }: IApplicationTheme) => ({
  content: {
    alignItems: "center",
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    flexWrap: "nowrap",
    justifyContent: "center",
    overflowY: "auto",
    width: "100%"
  },
  root: {
    backgroundColor: palette.background.paper,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    transitionDuration: "250ms"
  }
});
