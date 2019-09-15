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
import { errorPageStyle } from "./ErrorPage.style";

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

        <main className={classes.content}>

          <div className={classes.label}>
            Page not found.
          </div>

          <button onClick={this.onHomeNavigated}>
            Home
          </button>

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
