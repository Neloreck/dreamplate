import { Bind, Consume } from "dreamstate";
import * as React from "react";
import { PureComponent, ReactNode } from "react";
import { WithTranslation } from "react-i18next";

// Lib.
import { Styled, Translated } from "@Lib/decorators";

// Data.
import { IRouterContext, routerContextManager } from "@Main/data/store";

// View.
import { AppBar, Button, Grid, Typography, WithStyles } from "@material-ui/core";
import { errorPageStyle } from "./ErrorPage.Style";

// Props.
export interface IErrorPageOwnProps {}
export interface IErrorPageInjectedProps extends WithStyles<typeof errorPageStyle>, WithTranslation, IRouterContext {}
export interface IErrorPageProps extends IErrorPageOwnProps, IErrorPageInjectedProps {}

@Translated()
@Styled(errorPageStyle)
@Consume(routerContextManager)
export class ErrorPage extends PureComponent<IErrorPageProps> {

  public render(): ReactNode {

    const { classes, t } = this.props;

    return (
      <Grid
        className={classes.root}
        direction={"column"}
        wrap={"nowrap"}
        container
      >

        <AppBar className={classes.appBar}>
          {t("boilerplateLabel")}
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
            {t("pageNotFoundLabel")}
          </Typography>

          <Button
            variant={"contained"}
            onClick={this.onHomeNavigated}
          >
            {t("goHomeLabel")}
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
