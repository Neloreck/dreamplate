import { createUseStyles } from "react-jss";

// Lib.
import { IApplicationTheme } from "@Lib/theme";

export const useStyles = createUseStyles(({ palette }: IApplicationTheme) => ({
  content: {
    alignItems: "center",
    alignSelf: "normal",
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "center",
    overflowY: "auto"
  }
}));
