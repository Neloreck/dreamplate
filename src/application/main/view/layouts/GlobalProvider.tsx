import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Consume } from "dreamstate";
import * as React from "react";
import { PureComponent, ReactNode } from "react";

// Data.
import { ILanguageContext, IThemeContext, themeContextManager } from "@Main/data/store";

// Props.
export interface IGlobalProviderProps extends IThemeContext, ILanguageContext {}

@Consume(themeContextManager)
export class GlobalProvider extends PureComponent<IGlobalProviderProps> {

  public render(): ReactNode {

    const { children, themeState } = this.props;

    return (
      <MuiThemeProvider theme={createMuiTheme(themeState.options)}>
        {children}
      </MuiThemeProvider>
    );
  }

}
