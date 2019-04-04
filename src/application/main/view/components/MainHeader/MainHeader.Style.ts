import { createStyles, Theme } from "@material-ui/core/styles";

export const mainHeaderStyle = (theme: Theme) => createStyles({
  root: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: theme.spacing.unit * 1.5
  }
});
