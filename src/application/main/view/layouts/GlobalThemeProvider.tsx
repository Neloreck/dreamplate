import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { Consume } from "@redux-cbd/context";
import * as React from "react";
import { PureComponent, ReactNode } from "react";

// Data.
import { IThemeContext, themeContextManager } from "@Main/data/store";

// Props.
export interface IGlobalThemeProviderProps extends IThemeContext {}

@Consume(themeContextManager)
export class GlobalThemeProvider extends PureComponent<IGlobalThemeProviderProps> {

  public render(): ReactNode {

    const { children, themeState: { options } } = this.props;

    return (
      <MuiThemeProvider theme={createMuiTheme(options)}>
        {children}
      </MuiThemeProvider>
    );
  }

}
