/**
 * @module @application/main
 */

import { PureComponent, ReactNode } from "react";
import { WithStyles } from "react-jss";

// Lib.
import { Styled } from "@Lib/utils";

import { IThemeContext, ThemeContextManager } from "@Main/data/store";

// View.
import { mainHeaderStyle } from "./MainHeader.style";

import "@Lib/components/custom/CustomButton";
import "@Lib/components/custom/CustomHeading";

// Props.
export interface IMainHeaderOwnProps {}

export interface IMainHeaderInjectedProps extends WithStyles<typeof mainHeaderStyle> {}

export interface IMainHeaderProps extends IMainHeaderOwnProps, IMainHeaderInjectedProps {}

@Styled(mainHeaderStyle)
export class MainHeader extends PureComponent<IMainHeaderProps, {}, IThemeContext> {

  public render(): ReactNode {

    const { classes } = this.props;

    return (
      <header className={classes.root}>

        <custom-heading
          text={"Dreamplate"}
          size={4}
        />

        <custom-button
          onClick={this.onThemeToggleClicked}
        >
          Toggle
        </custom-button>

      </header>
    );
  }

  private onThemeToggleClicked(): void {
    (ThemeContextManager.current() as ThemeContextManager).toggleTheme();
  }

}
