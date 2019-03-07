import * as React from "react";
import { PureComponent, ReactNode } from "react";

// Lib.
import { Styled } from "@Lib/decorators";

// View.
import { AnimatedMount } from "@Main/view/utils";
import { Grid, WithStyles } from "@material-ui/core";
import { HomeLayout, IHomeLayoutInjectedProps } from "@Module/home/view/components/home/HomeLayout";
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
              justify={"space-around"}
              direction={"column"}
              alignItems={"stretch"}
              container
            >
              <HomeLayout {...{} as IHomeLayoutInjectedProps}/>
            </Grid>

          </AnimatedMount>

      </Grid>
    );
  }

}
