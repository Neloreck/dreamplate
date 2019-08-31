import { PureComponent, ReactNode } from "react";
import { WithStyles } from "react-jss";

// Lib.
import { Styled, Wrapped } from "@Lib/decorators";

// View.
import { IMainHeaderInjectedProps, MainHeader } from "@Module/home/view/components/MainHeader";
import { GlobalProvider } from "@Main/view/layouts";
import { homePageStyle } from "./HomePage.style";

// Types.
export interface IHomePageOwnProps {}

export interface IHomePageInjectedProps extends WithStyles<typeof homePageStyle> {}

export interface IHomePageProps extends IHomePageOwnProps, IHomePageInjectedProps {}

@Wrapped(GlobalProvider)
@Styled(homePageStyle)
export class HomePage extends PureComponent<IHomePageProps> {

  public render(): ReactNode {

    const { classes } = this.props;

    return (
      <>

        <MainHeader {...{} as IMainHeaderInjectedProps}/>

        <main className={classes.content}>

          <div className={classes.card}>
            <a target={"_blank"} href={"https://reactjs.org/"}>
              React
            </a>
          </div>

          <div className={classes.card}>
            <a target={"_blank"} href={"https://www.typescriptlang.org/"}>
              Typescript
            </a>
          </div>

          <div className={classes.card}>
            <a target={"_blank"} href={"https://github.com/Neloreck/dreamstate/"}>
              DreamState
            </a>
          </div>

        </main>

      </>
    );
  }

}
