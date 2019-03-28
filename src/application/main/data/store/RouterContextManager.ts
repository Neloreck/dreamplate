import { Bind, ContextManager } from "dreamstate";
import { createBrowserHistory, History, Path } from "history";
import { createElement, ReactNode } from "react";
import { Router as ReactRouter } from "react-router-dom";

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
    history: History;
  };
}

export class RouterContextManager extends ContextManager<IRouterContext> {

  protected context: IRouterContext = {
    routingActions: {
      getCurrentLocation: this.getCurrentLocation,
      goBack: this.goBack,
      push: this.push,
      replace: this.replace
    },
    routingState: {
      history: createBrowserHistory()
    }
  };

  protected log: Logger = new Logger("[🗺️ROUTER]", true);

  public getProvider(): any {
    // Create router wrapper with provider for app-level.
    return (props: any): ReactNode =>
      createElement(ReactRouter, { history: this.context.routingState.history },
        createElement(super.getProvider(), props, props.children)
      );
  }

  @Bind()
  public getHistory(): History {
    return this.context.routingState.history;
  }

  @Bind()
  protected replace(path: Path): void {

    this.log.info(`Replace path: ${path}.`);
    this.context.routingState.history.replace(path);
  }

  @Bind()
  protected push(path: Path): void {

    this.log.info(`Push path: ${path}.`);
    this.context.routingState.history.push(path);
  }

  @Bind()
  protected goBack(): void {

    this.log.info("Go back.");
    this.context.routingState.history.goBack();
  }

  @Bind()
  protected getCurrentLocation(): string {
    return this.context.routingState.history.location.pathname;
  }

}
