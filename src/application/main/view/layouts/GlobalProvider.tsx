import { Consume } from "dreamstate";
import { CreateGenerateIdOptions } from "jss";
import { PureComponent, ReactNode } from "react";
import { JssProvider, ThemeProvider } from "react-jss";

// Data.
import { applicationConfig } from "@Main/data/configs/ApplicationConfig";
import { IThemeContext, themeContextManager } from "@Main/data/store";

// Props.
export interface IGlobalProviderProps extends IThemeContext {}

@Consume(themeContextManager)
export class GlobalProvider extends PureComponent<IGlobalProviderProps> {

  private readonly jssConfig: Readonly<CreateGenerateIdOptions> = {
    minify: !applicationConfig.isDev
  };

  public render(): ReactNode {

    const { children, themeState: { theme } } = this.props;

    /*
     * For profiling:
     * <StrictMode> </StrictMode>
     */

    return (
      <JssProvider id={this.jssConfig}>

        <ThemeProvider theme={theme}>

          { children as any }

        </ThemeProvider>

      </JssProvider>
    );
  }

}
