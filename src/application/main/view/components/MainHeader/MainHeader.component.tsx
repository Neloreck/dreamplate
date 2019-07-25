import { Consume } from "dreamstate";
import { PureComponent, ReactNode } from "react";
import { WithSheet } from "react-jss";

// Lib.
import { Styled } from "@Lib/decorators";

// Data.
import { IThemeContext, themeContextManager } from "@Main/data/store";

// View.
import { mainHeaderStyle } from "./MainHeader.Style";

// Props.
export interface IMainHeaderOwnProps {}

export interface IMainHeaderInjectedProps extends WithSheet<typeof mainHeaderStyle>, IThemeContext {}

export interface IMainHeaderProps extends IMainHeaderOwnProps, IMainHeaderInjectedProps {}

@Styled(mainHeaderStyle)
@Consume(themeContextManager)
export class MainHeader extends PureComponent<IMainHeaderProps> {

  public render(): ReactNode {

    const { classes } = this.props;

    return (
      <header className={classes.root}>

        <h2>
          Boilerplate
        </h2>

        { this.renderToggleThemeButton() }

      </header>
    );
  }

  private renderToggleThemeButton(): ReactNode {

    const { classes, themeActions  } = this.props;

    return (
      <button className={classes.switchButton} onClick={themeActions.toggleTheme}>
        Toggle
      </button>
    );
  }

}
