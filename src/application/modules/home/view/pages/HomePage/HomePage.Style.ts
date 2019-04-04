import { createStyles, Theme } from "@material-ui/core/styles";

export const homePageStyle = (theme: Theme) => createStyles({
  card: {
    "& a": {
     color: theme.palette.text.primary
    },
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
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
