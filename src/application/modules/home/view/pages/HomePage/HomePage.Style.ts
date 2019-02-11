import { Theme } from "@material-ui/core";
import { createStyles } from "@material-ui/core/styles";

export const homePageStyle = (theme: Theme) => createStyles({
  content: {
    backgroundSize: "cover",
    flexGrow: 24,
    padding: theme.spacing.unit,
    overflowY: "auto",
    width: "100%"
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    height: "100%",
    width: "100%"
  }
});
