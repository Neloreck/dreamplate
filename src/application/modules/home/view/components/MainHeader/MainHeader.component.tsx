import { Consume } from "dreamstate";
import { PureComponent, ReactNode } from "react";
import { WithStyles } from "react-jss";

// Lib.
import { Styled } from "@Lib/decorators";

// Data.
import { IThemeContext, themeContextManager } from "@Main/data/store";

// View.
import { mainHeaderStyle } from "./MainHeader.style";

// Props.
export interface IMainHeaderOwnProps {}

export interface IMainHeaderInjectedProps extends WithStyles<typeof mainHeaderStyle>, IThemeContext {}

export interface IMainHeaderProps extends IMainHeaderOwnProps, IMainHeaderInjectedProps {}

@Styled(mainHeaderStyle)
@Consume(themeContextManager)
export class MainHeader extends PureComponent<IMainHeaderProps> {

  public render(): ReactNode {

    const { classes, themeActions } = this.props;

    return (
      <header className={classes.root}>

        <h2>
          Boilerplate
        </h2>

        <button className={classes.switchButton} onClick={themeActions.toggleTheme}>
          Toggle
        </button>

      </header>
    );
  }

}
