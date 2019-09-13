/**
 * @module main/view
 */

import { Bind } from "dreamstate";
import { PureComponent, ReactNode } from "react";
import { WithStyles } from "react-jss";

// Lib.
import { Styled } from "@Lib/decorators";

// Data.
import { routerContextManager } from "@Main/data/store";

// View.
import { errorPageStyle } from "./ErrorPage.style";

// Types.
export interface IErrorPageOwnProps {}

export interface IErrorPageInjectedProps extends WithStyles<typeof errorPageStyle> {}

export interface IErrorPageProps extends IErrorPageOwnProps, IErrorPageInjectedProps {}

@Styled(errorPageStyle)
export class ErrorPage extends PureComponent<IErrorPageProps> {

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
    routerContextManager.push("/home");
  }

}
