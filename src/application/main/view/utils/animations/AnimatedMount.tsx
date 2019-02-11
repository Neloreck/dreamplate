import * as React from "react";
import { Component, ReactNode } from "react";

// View.
import { Grow } from "@material-ui/core";

// Props.
export interface IAnimatedMountState {
  mounted: boolean;
}

export interface IAnimatedMountProps {
  children: ReactNode;
}

export class AnimatedMount extends Component<IAnimatedMountProps, IAnimatedMountState> {

  public state: IAnimatedMountState = {
    mounted: true
  };

  public componentDidMount(): void {
    this.setState({ mounted: true });
  }

  public componentWillUnmount(): void {
    this.setState({ mounted: false });
  }

  public render(): ReactNode {

    const { children } = this.props;
    const { mounted } = this.state;

    return (
      <Grow in={mounted}>
        {children}
      </Grow>
    );
  }
}
