import * as React from "react";
import { PureComponent, ReactNode } from "react";

// Lib.
import { Styled } from "@Lib/decorators";

// View.
import { AnimatedMount } from "@Main/view/utils";
import { Grid, WithStyles } from "@material-ui/core";
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
      <Grid className={classes.root} wrap={"nowrap"} container>

        <AnimatedMount>

          <Grid
            className={classes.content}
            justify={"center"}
            direction={"column"}
            alignItems={"center"}
            container
          >

            <span>
              Change some code there and move on. Use flex grid for aligning.
            </span>

          </Grid>

        </AnimatedMount>

      </Grid>
    );
  }

}
