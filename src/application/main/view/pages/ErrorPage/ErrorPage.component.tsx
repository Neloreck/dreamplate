/**
 * @module @application/main
 */

import { Bind } from "dreamstate";
import { Context, PureComponent, ReactNode } from "react";
import { WithStyles } from "react-jss";

// Lib.
import { Styled } from "@Lib/decorators";

// Data.
import { IRouterContext, RouterContextManager } from "@Main/data/store";

// View.
import { IMainHeaderInjectedProps, MainHeader } from "@Modules/home/view/components/MainHeader";
import { errorPageStyle } from "./ErrorPage.style";

import "@Lib/components/custom/CustomButton";
import "@Lib/components/custom/CustomCard";

// Props.
export interface IErrorPageOwnProps {}

export interface IErrorPageInjectedProps extends WithStyles<typeof errorPageStyle> {}

export interface IErrorPageProps extends IErrorPageOwnProps, IErrorPageInjectedProps {}

@Styled(errorPageStyle)
export class ErrorPage extends PureComponent<IErrorPageProps, {}, IRouterContext> {

  public static contextType: Context<IRouterContext> = RouterContextManager.getContextType();

  public render(): ReactNode {

    const { classes } = this.props;

    return (
      <>

        <MainHeader {...{} as IMainHeaderInjectedProps}/>

        <main className={classes.content}>

          <custom-card class={classes.labelCard}>
            Page was not found.
          </custom-card>

          <custom-button onClick={this.onHomeNavigated}>
            Go Home
          </custom-button>

        </main>

      </>
    );
  }

  @Bind()
  private onHomeNavigated(): void {

    const { routingActions } = this.context;

    routingActions.push("/home");
  }

}
