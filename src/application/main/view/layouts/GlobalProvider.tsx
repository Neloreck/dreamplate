import { MuiThemeProvider } from "@material-ui/core/styles";
import { Consume } from "dreamstate";
import * as React from "react";
import { PureComponent, ReactNode } from "react";

// Data.
import { IThemeContext, themeContextManager } from "@Main/data/store";

// Props.
export interface IGlobalProviderProps extends IThemeContext {}

@Consume(themeContextManager)
export class GlobalProvider extends PureComponent<IGlobalProviderProps> {

  public render(): ReactNode {

    const { children, themeState: { theme } } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    );
  }

}
