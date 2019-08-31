import { Bind, Consume } from "dreamstate";
import { PureComponent, ReactNode } from "react";
import { WithStyles } from "react-jss";

// Lib.
import { Styled, Wrapped } from "@Lib/decorators";

// Data.
import { IRouterContext, routerContextManager } from "@Main/data/store";

// View.
import { GlobalProvider } from "@Main/view/layouts";
import { errorPageStyle } from "./ErrorPage.style";

// Types.
export interface IErrorPageOwnProps {}

export interface IErrorPageInjectedProps extends WithStyles<typeof errorPageStyle>, IRouterContext {}

export interface IErrorPageProps extends IErrorPageOwnProps, IErrorPageInjectedProps {}

@Wrapped(GlobalProvider)
@Styled(errorPageStyle)
@Consume(routerContextManager)
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

    const { routingActions } = this.props;

    routingActions.push("/home");
  }

}
