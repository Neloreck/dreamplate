import { Consume } from "dreamstate";
import * as React from "react";
import { PureComponent, ReactNode } from "react";

// Lib.
import { Styled } from "@Lib/decorators";

// Data.
import { IThemeContext, themeContextManager } from "@Main/data/store";

// View.
import { AppBar, IconButton, Typography, WithStyles } from "@material-ui/core";
import { Brightness3, Brightness5 } from "@material-ui/icons";
import { mainHeaderStyle } from "./MainHeader.Style";

// Props.
export interface IMainHeaderOwnProps {}
export interface IMainHeaderInjectedProps extends WithStyles<typeof mainHeaderStyle>, IThemeContext {}
export interface IMainHeaderProps extends IMainHeaderOwnProps, IMainHeaderInjectedProps {}

@Styled(mainHeaderStyle)
@Consume(themeContextManager)
export class MainHeader extends PureComponent<IMainHeaderProps> {

  public render(): ReactNode {

    const { classes } = this.props;

    return (
      <AppBar
        className={classes.root}
        position={"relative"}
      >

        <Typography variant={"h5"}>
          Boilerplate
        </Typography>

        { this.renderToggleThemeButton() }

      </AppBar>
    );
  }

  private renderToggleThemeButton(): ReactNode {

    const { themeActions } = this.props;

    return (
      <IconButton
        name={"themeToggle"}
        onClick={themeActions.toggleTheme}
      >
        { themeActions.isDark() ? <Brightness3/> : <Brightness5/> }
      </IconButton>
    );
  }

}
