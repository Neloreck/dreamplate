import { PureComponent, ReactNode } from "react";
import { WithSheet } from "react-jss";

// Lib.
import { Styled } from "@Lib/decorators";

// View.
import { IMainHeaderInjectedProps, MainHeader } from "@Main/view/components/MainHeader";
import { homePageStyle } from "./HomePage.style";

// Types.
export interface IHomePageOwnProps {}

export interface IHomePageInjectedProps extends WithSheet<typeof homePageStyle> {}

export interface IHomePageProps extends IHomePageOwnProps, IHomePageInjectedProps {}

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
