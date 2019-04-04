import { Bind, Consume } from "dreamstate";
import * as React from "react";
import { PureComponent, ReactNode } from "react";

// Lib.
import { Styled } from "@Lib/decorators";

// Data.
import { IRouterContext, routerContextManager } from "@Main/data/store";

// View.
import { IMainHeaderInjectedProps, MainHeader } from "@Main/view/components/MainHeader";
import { Button, Grid, Typography, WithStyles } from "@material-ui/core";
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
      <Grid
        className={classes.root}
        direction={"column"}
        wrap={"nowrap"}
        container
      >

        <MainHeader {...{} as IMainHeaderInjectedProps}/>

        <Grid
          className={classes.content}
          justify={"center"}
          direction={"column"}
          alignItems={"center"}
          component={"main"}
          container
        >

          <Typography variant={"h5"}>
            Page not found.
          </Typography>

          <Button
            variant={"contained"}
            onClick={this.onHomeNavigated}
          >
            Home
          </Button>

        </Grid>

      </Grid>
    );
  }

  @Bind()
  private onHomeNavigated(): void {

    const { routingActions } = this.props;

    routingActions.push("/home");
  }

}
