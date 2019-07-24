import { IApplicationTheme } from "@Main/data/store/theme/ThemeTypes";

export const mainHeaderStyle = ({ palette, spacing }: IApplicationTheme) => ({
  root: {
    alignItems: "center",
    background: palette.primary.dark,
    boxShadow: `1px 1px 2px 0 ${palette.primary.dark}`,
    boxSizing: "border-box",
    color: palette.text.primary,
    display: "flex",
    flexDirection: "row",
    fontSize: spacing.unit * 4,
    justifyContent: "space-between",
    minWidth: spacing.unit * 30,
    padding: spacing.unit * 2,
    transitionDuration: "250ms"
  },
  switchButton: {
    "&:hover": {
      filter: "brightness(0.85)"
    },
    background: `linear-gradient(90deg, ${palette.primary.main} 45%, ${palette.secondary.main} 90%);`,
    border: 0,
    boxShadow: `2px 1px 8px 0 ${palette.secondary.dark}`,
    cursor: "pointer",
    fontWeight: "bold",
    padding: spacing.unit,
    transitionDuration: "250ms"
  }
});
