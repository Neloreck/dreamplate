import { Bind, ContextManager } from "dreamstate";
import { CreateGenerateIdOptions } from "jss";

// Lib.
import { createTheme, EThemeType, IApplicationTheme } from "@Lib/theme";
import { getFromLocalStorage, Logger, setLocalStorageItem } from "@Lib/utils";

// Data.
import { applicationConfig } from "@Main/data/configs";

export interface IThemeContext {
  themeActions: {
    toggleTheme(): void;
  };
  themeState: {
    theme: IApplicationTheme;
  };
}

export class ThemeContextManager extends ContextManager<IThemeContext> {

  public static readonly JSS_CONFIG: CreateGenerateIdOptions = {
    minify: !applicationConfig.isDev
  };

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
      type: EThemeType.LIGHT
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

  private readonly log: Logger = new Logger(this.constructor.name);

  private readonly setState = ContextManager.getSetter(this, "themeState");

  @Bind()
  public toggleTheme(): void {

    const { theme } = this.context.themeState;

    const nextThemeType: EThemeType = (theme.palette.type === EThemeType.LIGHT ? EThemeType.DARK : EThemeType.LIGHT);

    theme.palette.type = nextThemeType;

    const newTheme: IApplicationTheme = createTheme(theme);

    setLocalStorageItem("theme", newTheme);

    document.body.style.backgroundColor = newTheme.palette.background.default;
    document.body.style.color = newTheme.palette.text.primary;
    document.head.getElementsByTagName("meta")["theme-color" as any].content = newTheme.palette.primary.main;

    this.log.info(`Toggle to '${nextThemeType}'.`);
    this.setState({ theme: newTheme });
  }

  protected onProvisionStarted(): void {
    this.log.info("Started theme context provision.");
  }

}
