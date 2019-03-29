import * as React from "react";
import { PureComponent, ReactNode } from "react";
import { WithTranslation } from "react-i18next";

// Lib.
import { Styled } from "@Lib/decorators";
import { Translated } from "@Lib/decorators/Translated";

// View.
import { AppBar, Card, Grid, WithStyles } from "@material-ui/core";
import { homePageStyle } from "./HomePage.Style";

// Props.
export interface IHomePageOwnProps {}
export interface IHomePageInjectedProps extends WithStyles<typeof homePageStyle>, WithTranslation {}
export interface IHomePageProps extends IHomePageOwnProps, IHomePageInjectedProps {}

@Translated()
@Styled(homePageStyle)
export class HomePage extends PureComponent<IHomePageProps> {

  public render(): ReactNode {

    const { classes, t } = this.props;

    return (
      <Grid
        className={classes.root}
        direction={"column"}
        wrap={"nowrap"}
        container
      >

        <AppBar className={classes.appBar} position={"relative"}>
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

          <Card className={classes.card}>
            {t("changeSomeCodeLabel")}
          </Card>

          <Grid direction={"row"} justify={"center"} container>

            <Card className={classes.card}>
              <a target={"_blank"} href={"https://reactjs.org/"}> React </a>
            </Card>

            <Card className={classes.card}>
              <a target={"_blank"} href={"https://material-ui.com/"}> MaterialUI </a>
            </Card>

            <Card className={classes.card}>
              <a target={"_blank"} href={"https://www.typescriptlang.org/"}> Typescript </a>
            </Card>

            <Card className={classes.card}>
              <a target={"_blank"} href={"https://github.com/Neloreck/dreamstate/"}> DreamState </a>
            </Card>

            <Card className={classes.card}>
              <a target={"_blank"} href={"https://www.i18next.com/"}> i18next </a>
            </Card>

          </Grid>

        </Grid>

      </Grid>
    );
  }

}
