import { Consume } from "dreamstate";
import { PureComponent, ReactNode } from "react";
import { ThemeProvider } from "react-jss";

// Data.
import { IThemeContext, themeContextManager } from "@Main/data/store";

// Props.
export interface IGlobalProviderProps extends IThemeContext {}

@Consume(themeContextManager)
export class GlobalProvider extends PureComponent<IGlobalProviderProps> {

  public render(): ReactNode {

    const { children, themeState: { theme } } = this.props;

    /*
     * For profiling:
     * <StrictMode> </StrictMode>
     */

    return (
      <ThemeProvider theme={theme}>
        { children as any }
      </ThemeProvider>
    );
  }

}
