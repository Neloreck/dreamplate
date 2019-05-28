import { Bind, ContextManager } from "dreamstate";

// Lib.
import { Logger } from "@Lib/utils";

// Data.
import { EThemeType, IApplicationTheme } from "@Main/data/store/theme/ThemeTypes";
import { createTheme } from "@Main/data/store/theme/ThemeUtils";

export interface IThemeContext {
  themeActions: {
    isDark(): boolean;
    toggleTheme(): void;
  };
  themeState: {
    theme: IApplicationTheme;
  };
}

export class ThemeContextManager extends ContextManager<IThemeContext> {

  private static readonly DEFAULT_THEME_PARAMS: IApplicationTheme = {
    palette: {
      background: {
        default: "#FFF",
        paper: "#EEE"
      },
      primary: {
        dark: "#4c497c",
        light: "#9690FC",
        main: "#a8a5ec",
      },
      secondary: {
        dark: "#6b5b71",
        light: "rgb(166,143,176)",
        main: "#cfb3dc",
      },
      text: {
        primary: "#000",
        secondary: "#333"
      },
      type: EThemeType.LIGHT
    },
    spacing: {
      unit: 8
    }
  };

  protected context: IThemeContext = {
    themeActions: {
      isDark: this.isDark,
      toggleTheme: this.toggleTheme
    },
    themeState: {
      theme: createTheme(ThemeContextManager.DEFAULT_THEME_PARAMS)
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

    const nextThemeType: EThemeType = (theme.palette.type === EThemeType.LIGHT ? EThemeType.DARK : EThemeType.LIGHT);

    theme.palette.type = nextThemeType;

    this.log.info(`Toggle to '${nextThemeType}'.`);

    this.setState({ theme: createTheme(theme) });
  }

}
