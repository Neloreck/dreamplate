import { Bind, ContextManager } from "dreamstate";
import { createBrowserHistory, History } from "history";

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

  public context: IRouterContext = {
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

  protected log: Logger = new Logger("[🗺️ROUTER]");

  @Bind()
  public replace(path: string): void {

    this.log.info(`Replace path: ${path}.`);
    this.context.routingState.history.replace(path);
    this.update();
  }

  @Bind()
  public push(path: string): void {

    this.log.info(`Push path: ${path}.`);
    this.context.routingState.history.push(path);
    this.update();
  }

  @Bind()
  public goBack(): void {

    this.log.info(`Go back.`);
    this.context.routingState.history.goBack();
    this.update();
  }

  @Bind()
  public getCurrentLocation(): string {
    return this.context.routingState.history.location.pathname;
  }

}
