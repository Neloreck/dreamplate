import * as React from "react";
import { PureComponent, ReactNode } from "react";

// Lib.
import { Styled } from "@Lib/decorators";

// View.
import { Grid, WithStyles } from "@material-ui/core";
import { homeLayoutStyle } from "./HomeLayout.Style";

// Props.
export interface IHomeLayoutInjectedProps extends WithStyles<typeof homeLayoutStyle> {}
export interface IHomeLayoutOwnProps {}
export interface IHomeLayoutProps extends IHomeLayoutInjectedProps, IHomeLayoutOwnProps {}

@Styled(homeLayoutStyle)
export class HomeLayout extends PureComponent<IHomeLayoutProps> {

  public render(): ReactNode {

    const { classes } = this.props;

    return (
      <Grid className={classes.root} container>

        Some kind of root component.

      </Grid>
    );
  }

}
