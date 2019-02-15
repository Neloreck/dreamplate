import { createStyles, Theme } from "@material-ui/core/styles";

export const homeLayoutStyle = (theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    height: theme.spacing.unit * 10
  }
});
