import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";
import { PaletteOptions } from "@material-ui/core/styles/createPalette";
import { ReactContextManager } from "@redux-cbd/context";
import { Bind } from "@redux-cbd/utils";

export interface IThemeContext {
  themeActions: {
    isDark: () => boolean;
    setDark: (isDark: boolean) => void;
  };
  themeState: {
    options: ThemeOptions;
  };
}

export class ThemeContextManager extends ReactContextManager<IThemeContext> {

  protected context: IThemeContext = {
    themeActions: {
      isDark: this.isDark,
      setDark: this.setDark
    },
    themeState: {
      options: {
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
          type: "dark"
        },
        typography: {
          useNextVariants: true
        }
      }
    }
  };

  @Bind()
  public isDark(): boolean {
    return (this.context.themeState.options.palette as PaletteOptions).type === "dark";
  }

  @Bind()
  public setDark(isDark: boolean): void {
    this.context.themeState = Object.assign({}, this.context.themeState);

    if (isDark) {
      (this.context.themeState.options.palette as PaletteOptions).type = "dark";
    } else {
      (this.context.themeState.options.palette as PaletteOptions).type = "light";
    }

    this.update();
  }

}
