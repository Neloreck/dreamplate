import * as React from "react";
import { PureComponent, ReactNode } from "react";

// Lib.
import { Styled } from "@Lib/mui";

// View.
import { WithStyles } from "@material-ui/core";
import { errorPageStyle } from "./ErrorPage.Style";

// Props.
export interface IErrorPageOwnProps {}
export interface IErrorPageExternalProps extends WithStyles<typeof errorPageStyle> {}
export interface IErrorPageProps extends IErrorPageOwnProps, IErrorPageExternalProps {}

@Styled(errorPageStyle)
export class ErrorPage extends PureComponent<IErrorPageProps> {

  public render(): ReactNode {

    const { classes } = this.props;

    return (
      <div className={classes.root}>

        <div className={classes.content}>
          This is error page...
        </div>

      </div>
    );
  }

}
