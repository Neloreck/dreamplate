/**
 * @packageDocumentation
 * @module @application/main
 */

import { Bind, ContextManager, TStateSetter } from "dreamstate";
import { CreateGenerateIdOptions } from "jss";

// Lib.
import { log } from "@Macro/log.macro";
import { createDefaultTheme, IApplicationTheme, toggleTheme, TThemeType } from "@Lib/theme";
import { encrypt, getFromLocalStorage, parse, setLocalStorageItem } from "@Lib/utils";

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
      theme: createDefaultTheme(getFromLocalStorage("theme_type") || GTheme.DEFAULT_THEME_TYPE)
    }
  };

  private readonly setState: TStateSetter<IThemeContext, "themeState"> = ContextManager.getSetter(this, "themeState");

  /**
   * Toggle application theme mode and save it into local storage.
   * Apply it to document body.
   */
  public toggleTheme(): void {

    const { theme } = this.context.themeState;

    const nextThemeType: TThemeType = (theme.palette.type === "light" ? "dark" : "light");
    const nextTheme: IApplicationTheme = toggleTheme(theme, nextThemeType);

    log.info(`Toggle theme mode to '${nextThemeType}'.`);

    try {
      setLocalStorageItem("theme_type", nextThemeType);
    } catch (error) {
      /* <dev> */
      log.warn("Failed to cache application theme:", error);
      /* </dev> */
    }

    document.body.style.backgroundColor = nextTheme.palette.background.default;
    document.body.style.color = nextTheme.palette.text.primary;

    this.setState({ theme: nextTheme });
  }

  /**
   * Send generic message on manager provision start and subscribe to events.
   */
  protected onProvisionStarted(): void {

    const { themeState: { theme } } = this.context;

    log.info(`Theme provision started [${theme.palette.type}].`);

    window.addEventListener("storage", this.onLocalStorageDataChanged);
  }

  /**
   * Unsubscribe from events after provision end.
   */
  protected onProvisionEnded(): void {
    window.removeEventListener("storage", this.onLocalStorageDataChanged);
  }

  /**
   * Observe theme configuration changes and set same theme across tabs.
   */
  private onLocalStorageDataChanged(event: StorageEvent): void {

    const { theme } = this.context.themeState;
    const { key, newValue } = event;

    if (key === encrypt("theme_type")) {

      if (newValue) {
        this.setState({ theme: toggleTheme(theme, parse(newValue) as TThemeType) });
      } else {
        this.setState({ theme: createDefaultTheme(GTheme.DEFAULT_THEME_TYPE) });
      }
    }
  }

}
