import { Bind, Consume } from "dreamstate";
import { PureComponent, ReactNode } from "react";
import { WithStyles } from "react-jss";

// Lib.
import { Styled } from "@Lib/decorators";

// Data.
import { IRouterContext, routerContextManager } from "@Main/data/store";

// View.
import { IMainHeaderInjectedProps, MainHeader } from "@Main/view/components/MainHeader";
import { errorPageStyle } from "./ErrorPage.Style";

// Props.
export interface IErrorPageOwnProps {}

export interface IErrorPageInjectedProps extends WithStyles<typeof errorPageStyle>, IRouterContext {}

export interface IErrorPageProps extends IErrorPageOwnProps, IErrorPageInjectedProps {}

@Styled(errorPageStyle)
@Consume(routerContextManager)
export class ErrorPage extends PureComponent<IErrorPageProps> {

  public render(): ReactNode {

    const { classes } = this.props;

    return (
      <div className={classes.root}>

        <MainHeader {...{} as IMainHeaderInjectedProps}/>

        <div className={classes.content}>

          <div>
            Page not found.
          </div>

          <button onClick={this.onHomeNavigated}>
            Home
          </button>

        </div>

      </div>
    );
  }

  @Bind()
  private onHomeNavigated(): void {

    const { routingActions } = this.props;

    routingActions.push("/home");
  }

}
