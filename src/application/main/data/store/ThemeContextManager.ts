import { createMuiTheme } from "@material-ui/core/styles";
import { Theme, ThemeOptions } from "@material-ui/core/styles/createMuiTheme";
import { PaletteOptions } from "@material-ui/core/styles/createPalette";
import { Bind, ContextManager } from "dreamstate";

// Logger.
import { Logger } from "@Lib/utils";

export interface IThemeContext {
  themeActions: {
    isDark(): boolean;
    toggleTheme(): void;
  };
  themeState: {
    theme: Theme;
  };
}

export class ThemeContextManager extends ContextManager<IThemeContext> {

  private static readonly THEME_OPTIONS: ThemeOptions = {
    palette: {
      primary: {
        contrastText: "#ffffff",
        dark: "#465a75",
        light: "#779bc7",
        main: "#54728c"
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
      toggleTheme: this.toggleTheme
    },
    themeState: {
      theme: createMuiTheme(ThemeContextManager.THEME_OPTIONS)
    }
  };

  private readonly log: Logger = new Logger("[🍬THEME]");
  private readonly setState = ContextManager.getSetter(this, "themeState");

  protected onProvisionStarted(): void {
    this.log.info("Started theme context provision.");
  }

  @Bind()
  private isDark(): boolean {
    return this.context.themeState.theme.palette.type === "dark";
  }

  @Bind()
  private toggleTheme(): void {

    const { theme } = this.context.themeState;
    const nextThemeType: "light" | "dark" = theme.palette.type === "light" ? "dark" : "light";

    this.log.info(`Toggle to '${nextThemeType}'.`);
    (ThemeContextManager.THEME_OPTIONS.palette as PaletteOptions).type = nextThemeType;
    this.setState({ theme: createMuiTheme(ThemeContextManager.THEME_OPTIONS) });
  }

}
