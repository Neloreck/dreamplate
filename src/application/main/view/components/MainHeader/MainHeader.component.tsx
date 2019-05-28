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
      <div className={classes.root}>

        <div>
          Boilerplate
        </div>

        { this.renderToggleThemeButton() }

      </div>
    );
  }

  private renderToggleThemeButton(): ReactNode {

    const { classes, themeActions  } = this.props;

    return (
      <button className={classes.switchButton} onClick={themeActions.toggleTheme}>
        { themeActions.isDark() ? "DARK" : "LIGHT" }
      </button>
    );
  }

}
