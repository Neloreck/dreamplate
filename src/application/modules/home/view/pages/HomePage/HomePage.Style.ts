import { createStyles, Theme } from "@material-ui/core/styles";

export const homePageStyle = (theme: Theme) => createStyles({
  appBar: {
    padding: theme.spacing.unit * 3
  },
  card: {
    margin: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2
  },
  content: {
    backgroundSize: "cover",
    flexGrow: 1,
    overflowY: "auto",
    width: "100%"
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    height: "100%",
    width: "100%"
  }
});
