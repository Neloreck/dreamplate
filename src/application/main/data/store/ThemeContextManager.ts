import { Bind, ContextManager } from "dreamstate";
import { CreateGenerateIdOptions } from "jss";

// Lib.
import { DEFAULT_THEME, EThemeType, IApplicationTheme, toggleTheme } from "@Lib/theme";
import { getFromLocalStorage, Logger, setLocalStorageItem } from "@Lib/utils";

export interface IThemeContext {
  themeActions: {
    toggleTheme(): void;
  };
  themeState: {
    theme: IApplicationTheme;
  };
}

export class ThemeContextManager extends ContextManager<IThemeContext> {

  public static readonly JSS_ID_GENERATION_CONFIG: CreateGenerateIdOptions = {
    minify: !IS_DEV
  };

  public context: IThemeContext = {
    themeActions: {
      toggleTheme: this.toggleTheme
    },
    themeState: {
      theme: toggleTheme(getFromLocalStorage("theme") || DEFAULT_THEME)
    }
  };

  private readonly log: Logger = new Logger(ThemeContextManager.name);

  private readonly setState = ContextManager.getSetter(this, "themeState");

  @Bind()
  public toggleTheme(): void {

    const { theme } = this.context.themeState;

    const nextThemeType: EThemeType = (theme.palette.type === EThemeType.LIGHT ? EThemeType.DARK : EThemeType.LIGHT);
    const nextTheme: IApplicationTheme = toggleTheme(theme, nextThemeType);

    this.log.info(`Toggle theme mode to '${nextThemeType}'.`);

    setLocalStorageItem("theme", nextTheme);

    document.body.style.backgroundColor = nextTheme.palette.background.default;
    document.body.style.color = nextTheme.palette.text.primary;
    document.head.getElementsByTagName("meta")["theme-color" as any].content = nextTheme.palette.primary.main;

    this.setState({ theme: nextTheme });
  }

  protected onProvisionStarted(): void {
    this.log.info("Started theme context provision.");
  }

}
