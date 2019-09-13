/**
 * @module @application/main
 */

import { PureComponent, ReactNode } from "react";
import { WithStyles } from "react-jss";

// Lib.
import { Styled } from "@Lib/decorators";

// Data.
import { themeContextManager } from "@Main/data/store";

// View.
import { mainHeaderStyle } from "./MainHeader.style";

// Props.
export interface IMainHeaderOwnProps {}

export interface IMainHeaderInjectedProps extends WithStyles<typeof mainHeaderStyle> {}

export interface IMainHeaderProps extends IMainHeaderOwnProps, IMainHeaderInjectedProps {}

@Styled(mainHeaderStyle)
export class MainHeader extends PureComponent<IMainHeaderProps> {

  public render(): ReactNode {

    const { classes } = this.props;

    return (
      <header className={classes.root}>

        <h2>
          Boilerplate
        </h2>

        <button className={classes.switchButton} onClick={themeContextManager.toggleTheme}>
          Toggle
        </button>

      </header>
    );
  }

}
