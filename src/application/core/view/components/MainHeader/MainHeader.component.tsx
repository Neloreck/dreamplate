import { useManager } from "dreamstate";
import { ReactElement } from "react";
import { createUseStyles } from "react-jss";

import { IApplicationTheme } from "@Lib/theme";

import { ThemeManager } from "@Core/data/store";

export const useStyles = createUseStyles(({ palette, spacing }: IApplicationTheme) => ({
  root: {
    "& > header": {
      color: GColor.BLACK,
      cursor: "default"
    },
    background: palette.primary.dark,
    boxShadow: "0px 2px 4px -1px rgba(0, 0, 0, 0.25), 0px 4px 5px 0px rgba(0, 0, 0, 0.15)," +
            "0px 1px 10px 0px rgba(0, 0, 0, 0.10)",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: spacing.unit * 10,
    padding: `${spacing.unit * 2}px ${spacing.unit * 4}px`,
    position: "relative"
  }
}));

export function MainHeader({
  classes: { root } = useStyles(),
  themeContext: { themeActions: { toggleTheme } } = useManager(ThemeManager)
}): ReactElement {
  return (
    <header className={root}>
      <h2> Dreamplate </h2>

      <button onClick={toggleTheme}> Toggle </button>
    </header>
  );
}
