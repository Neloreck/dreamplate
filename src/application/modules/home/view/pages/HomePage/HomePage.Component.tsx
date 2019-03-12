import * as React from "react";
import { PureComponent, ReactNode } from "react";

// Lib.
import { Styled } from "@Lib/decorators";

// View.
import { AnimatedMount } from "@Main/view/utils";
import { AppBar, Card, Grid, WithStyles } from "@material-ui/core";
import { homePageStyle } from "./HomePage.Style";

// Props.
export interface IHomePageOwnProps {}
export interface IHomePageInjectedProps extends WithStyles<typeof homePageStyle> {}
export interface IHomePageProps extends IHomePageOwnProps, IHomePageInjectedProps {}

@Styled(homePageStyle)
export class HomePage extends PureComponent<IHomePageProps> {

  public render(): ReactNode {

    const { classes } = this.props;

    return (
      <Grid className={classes.root} container>

        <AnimatedMount>

          <Grid
            className={classes.content}
            justify={"center"}
            direction={"column"}
            alignItems={"center"}
            container
          >

            <AppBar className={classes.appBar}>
              AppBar
            </AppBar>

            <Card className={classes.card}>
              Change some code there and move on. Use flex grid for aligning.
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

            </Grid>

          </Grid>

        </AnimatedMount>

      </Grid>
    );
  }

}
