import * as React from "react";
import { PureComponent, ReactNode } from "react";

// Lib.
import { Styled } from "@Lib/decorators";

// Data.

// View.
import { CircularProgress, Grid, WithStyles } from "@material-ui/core";
import { mainLoadingProgressStyle } from "./MainLoadingProgress.Style";

// Props.
export interface IMainLoadingProgressComponentOwnProps {}
export interface IMainLoadingProgressComponentInjectedProps extends WithStyles<typeof mainLoadingProgressStyle> {}
export interface IMainLoadingProgressComponentProps extends IMainLoadingProgressComponentOwnProps, IMainLoadingProgressComponentInjectedProps {}

@Styled(mainLoadingProgressStyle)
export class MainLoadingProgressComponent extends PureComponent<IMainLoadingProgressComponentProps> {

  public render(): ReactNode {

    const { classes } = this.props;

    return (
      <Grid
        id={"lazy-load-spinner"} className={classes.root}
        alignContent={"center"} alignItems={"center"} justify={"center"} container
      >
        <CircularProgress size={250}/>
      </Grid>
    );
  }

}
