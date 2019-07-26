import { Bind, ContextManager } from "dreamstate";

// Lib.
import { getFromLocalStorage, Logger, setLocalStorageItem } from "@Lib/utils";

// Data.
import { EThemeType, IApplicationTheme } from "@Main/data/store/theme/ThemeTypes";
import { createTheme } from "@Main/data/store/theme/ThemeUtils";

export interface IThemeContext {
  themeActions: {
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
        dark: "#718db3",
        light: "#8ea7c5",
        main: "#7e9dc6"
      },
      secondary: {
        dark: "#6b5b71",
        light: "#A68FB0",
        main: "#cfb3dc"
      },
      text: {
        primary: "#000",
        secondary: "#333"
      },
      type: EThemeType.DARK
    },
    spacing: {
      unit: 8
    }
  };

  public context: IThemeContext = {
    themeActions: {
      toggleTheme: this.toggleTheme
    },
    themeState: {
      theme: createTheme(getFromLocalStorage("theme") || ThemeContextManager.DEFAULT_THEME_PARAMS)
    }
  };

  private readonly log: Logger = new Logger(ThemeContextManager.name);
  private readonly setState = ContextManager.getSetter(this, "themeState");

  protected onProvisionStarted(): void {

    this.log.info("Started theme context provision.");

    const { theme } = this.context.themeState;

    // Set correct DOM colors.
    document.body.style.backgroundColor = theme.palette.background.default;
    document.body.style.color = theme.palette.text.primary;
    document.head.getElementsByTagName("meta")["theme-color" as any].content = theme.palette.primary.main;
  }

  @Bind()
  private toggleTheme(): void {

    const { theme } = this.context.themeState;

    const nextThemeType: EThemeType = (theme.palette.type === EThemeType.LIGHT ? EThemeType.DARK : EThemeType.LIGHT);

    theme.palette.type = nextThemeType;

    const newTheme: IApplicationTheme = createTheme(theme);

    setLocalStorageItem("theme", newTheme);

    this.log.info(`Toggle to '${nextThemeType}'.`);
    this.setState({ theme: newTheme });
  }

}
