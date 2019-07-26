import { Bind, ContextManager } from "dreamstate";
import { createBrowserHistory, History, Location, Path } from "history";
import { createElement, ReactNode } from "react";
import { Router as ReactRouter } from "react-router";

// Lib.
import { Logger } from "@Lib/utils";

export interface IRouterContext {
  routingActions: {
    replace(path: string): void;
    push(path: string): void;
    goBack(): void;
    getCurrentLocation(): string;
  };
  routingState: {
    path: string;
  };
}

export class RouterContextManager extends ContextManager<IRouterContext> {

  protected readonly history: History = createBrowserHistory();

  protected context: IRouterContext = {
    routingActions: {
      getCurrentLocation: this.getCurrentLocation,
      goBack: this.goBack,
      push: this.push,
      replace: this.replace
    },
    routingState: {
     path: this.history.location.pathname
    }
  };

  private readonly setState = ContextManager.getSetter(this, "routingState");
  private readonly log: Logger = new Logger(RouterContextManager.name, true);

  public constructor() {

    super();

    this.history.listen((location: Location) => this.setState({ path: location.pathname }));
  }

  public getProvider(): any {
    // Create router wrapper with provider for app-level.
    return (props: any): ReactNode =>
      createElement(ReactRouter, { history: this.history },
        createElement(super.getProvider(), props, props.children)
      );
  }

  protected onProvisionStarted(): void {
    this.log.info("Started router context provision.");
  }

  @Bind()
  private replace(path: Path): void {

    this.log.info(`Replace path: ${path}.`);
    this.history.replace(path);
  }

  @Bind()
  private push(path: Path): void {

    this.log.info(`Push path: ${path}.`);
    this.history.push(path);
  }

  @Bind()
  private goBack(): void {

    this.log.info("Go back.");
    this.history.goBack();
  }

  @Bind()
  private getCurrentLocation(): string {
    return this.history.location.pathname;
  }

}
