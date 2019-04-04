import { createStyles, Theme } from "@material-ui/core/styles";

export const errorPageStyle = (theme: Theme) => createStyles({
  content: {
    backgroundSize: "cover",
    flexGrow: 24,
    flexWrap: "nowrap",
    overflowY: "auto",
    width: "100%"
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    height: "100%",
    width: "100%"
  }
});
