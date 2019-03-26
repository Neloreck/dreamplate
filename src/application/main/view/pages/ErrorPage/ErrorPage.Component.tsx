import { Bind, Consume } from "dreamstate";
import * as React from "react";
import { PureComponent, ReactNode } from "react";

// Lib.
import { Styled } from "@Lib/decorators";

// Data.
import { IRouterContext, routerContextManager } from "@Main/data/store";

// View.
import { AppBar, Button, Grid, Typography, WithStyles } from "@material-ui/core";
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

        <AppBar className={classes.appBar}>
          Boilerplate
        </AppBar>

        <Grid
          className={classes.content}
          justify={"center"}
          direction={"column"}
          alignItems={"center"}
          component={"main"}
          container
        >

          <Typography variant={"h5"}>
            Route page has not been found.
          </Typography>

          <Button variant={"contained"} onClick={this.onHomeNavigated}>
            Home.
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
