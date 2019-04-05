import * as React from "react";
import { PureComponent, ReactNode } from "react";

// Lib.
import { Styled } from "@Lib/decorators";

// View.
import { IMainHeaderInjectedProps, MainHeader } from "@Main/view/components/MainHeader";
import { Card, Grid, WithStyles } from "@material-ui/core";
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

          <Card className={classes.card}>
            Change some code and move on.
          </Card>

          <Grid direction={"row"} justify={"center"} container>

            <Card className={classes.card}>
              <a target={"_blank"} href={"https://reactjs.org/"}>
                React
              </a>
            </Card>

            <Card className={classes.card}>
              <a target={"_blank"} href={"https://material-ui.com/"}>
                MaterialUI
              </a>
            </Card>

            <Card className={classes.card}>
              <a target={"_blank"} href={"https://www.typescriptlang.org/"}>
                Typescript
              </a>
            </Card>

            <Card className={classes.card}>
              <a target={"_blank"} href={"https://github.com/Neloreck/dreamstate/"}>
                DreamState
              </a>
            </Card>

          </Grid>

        </Grid>

      </Grid>
    );
  }

}
