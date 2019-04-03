import { createMuiTheme } from "@material-ui/core/styles";
import { Theme, ThemeOptions } from "@material-ui/core/styles/createMuiTheme";
import { PaletteOptions } from "@material-ui/core/styles/createPalette";
import { Bind, ContextManager } from "dreamstate";

// Logger.
import { Logger } from "@Lib/utils";

export interface IThemeContext {
  themeActions: {
    isDark(): boolean;
    setDark(isDark: boolean): void;
  };
  themeState: {
    theme: Theme;
  };
}

export class ThemeContextManager extends ContextManager<IThemeContext> {

  private static THEME_OPTIONS: ThemeOptions = {
    palette: {
      primary: {
        contrastText: "#ffffff",
        dark: "#324e76",
        light: "#447fc9",
        main: "#285e8e"
      },
      secondary: {
        contrastText: "#000000",
        dark: "#5a5a5a",
        light: "#dbdbdb",
        main: "#919191"
      },
      type: "light"
    },
    typography: {
      useNextVariants: true
    }
  };

  protected context: IThemeContext = {
    themeActions: {
      isDark: this.isDark,
      setDark: this.setDark
    },
    themeState: {
      theme: createMuiTheme(ThemeContextManager.THEME_OPTIONS)
    }
  };

  private readonly log: Logger = new Logger("[🍬THEME]");
  private readonly setState = ContextManager.getSetter(this, "themeState");

  @Bind()
  protected isDark(): boolean {
    return this.context.themeState.theme.palette.type === "dark";
  }

  @Bind()
  protected setDark(isDark: boolean): void {

    const { theme } = this.context.themeState;
    const nextThemeType: "light" | "dark" = isDark ? "dark" : "light";

    if (nextThemeType !== theme.palette.type) {

      this.log.info(`Switching theme type to '${nextThemeType}'. Creating new sheets.`);
      (ThemeContextManager.THEME_OPTIONS.palette as PaletteOptions).type = nextThemeType;
      this.setState({ theme: createMuiTheme(ThemeContextManager.THEME_OPTIONS) });
    }

  }

  protected onProvisionStarted(): void {
    this.log.info("Started theme context provision.");
  }

}
