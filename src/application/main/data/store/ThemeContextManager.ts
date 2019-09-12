/**
 * @module main/data
 */

import { Bind, ContextManager } from "dreamstate";
import { CreateGenerateIdOptions } from "jss";

// Lib.
import { createDefaultTheme, EThemeType, IApplicationTheme, toggleTheme } from "@Lib/theme";
import { getFromLocalStorage, Logger, setLocalStorageItem } from "@Lib/utils";

/**
 * Theme context description.
 */
export interface IThemeContext {
  themeActions: {
    toggleTheme(): void;
  };
  themeState: {
    theme: IApplicationTheme;
  };
}

/**
 * Context manager related to theme management.
 * It is responsible for theming, styling and generation configuration.
 */
export class ThemeContextManager extends ContextManager<IThemeContext> {

  public static readonly JSS_ID_GENERATION_CONFIG: CreateGenerateIdOptions = {
    minify: !IS_DEV
  };

  public context: IThemeContext = {
    themeActions: {
      toggleTheme: this.toggleTheme
    },
    themeState: {
      theme: getFromLocalStorage("theme") || createDefaultTheme()
    }
  };

  private readonly log: Logger = new Logger(ThemeContextManager.name);

  private readonly setState = ContextManager.getSetter(this, "themeState");

  /**
   * Toggle application theme mode and save it into local storage.
   * Apply it to document body.
   */
  @Bind()
  public toggleTheme(): void {

    const { theme } = this.context.themeState;

    const nextThemeType: EThemeType = (theme.palette.type === EThemeType.LIGHT ? EThemeType.DARK : EThemeType.LIGHT);
    const nextTheme: IApplicationTheme = toggleTheme(theme, nextThemeType);

    this.log.info(`Toggle theme mode to '${nextThemeType}'.`);

    try {
      setLocalStorageItem("theme", nextTheme);
    } catch (error) {
      /* <dev> */
      this.log.warn("Failed to cache application theme:", error);
      /* </dev> */
    }

    document.body.style.backgroundColor = nextTheme.palette.background.default;
    document.body.style.color = nextTheme.palette.text.primary;
    document.head.getElementsByTagName("meta")["theme-color" as any].content = nextTheme.palette.primary.main;

    this.setState({ theme: nextTheme });
  }

  /**
   * Send generic message on manager provision start.
   */
  protected onProvisionStarted(): void {
    this.log.info("Started theme context provision.");
  }

}
