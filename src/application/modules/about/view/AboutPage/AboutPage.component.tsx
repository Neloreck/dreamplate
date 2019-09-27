/**
 * @module @application/about
 */

import { Bind } from "dreamstate";
import { PureComponent, ReactNode } from "react";
import { WithStyles } from "react-jss";

// Lib.
import { Styled } from "@Lib/utils";

// Data.
import { RouterContextManager } from "@Main/data/store";

// View.
import { IMainHeaderInjectedProps, MainHeader } from "@Main/view/components/MainHeader";
import { aboutPageStyle } from "./AboutPage.style";

import "@Lib/components/custom/CustomButton";

// Props.
export interface IAboutPageOwnProps {}

export interface IAboutPageInjectedProps extends WithStyles<typeof aboutPageStyle> {}

export interface IAboutPageProps extends IAboutPageOwnProps, IAboutPageInjectedProps {}

@Styled(aboutPageStyle)
export class AboutPage extends PureComponent<IAboutPageProps> {

  public render(): ReactNode {

    const { classes } = this.props;

    return (
      <>

        <MainHeader {...{} as IMainHeaderInjectedProps}/>

        <main className={classes.content}>

          About page.

          <custom-button onClick={this.onHomeNavigated}>
            Go home
          </custom-button>

        </main>

      </>
    );
  }

  @Bind()
  private onHomeNavigated(): void {
    (RouterContextManager.current() as RouterContextManager).hardPush("/home");
  }

}
