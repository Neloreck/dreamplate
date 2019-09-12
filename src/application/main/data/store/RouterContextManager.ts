/**
 * @module main/data
 */

import { Bind, ContextManager } from "dreamstate";
import { createBrowserHistory, History, Location, Path } from "history";

// Lib.
import { Callable, Optional } from "@Lib/ts";
import { Logger } from "@Lib/utils";

/**
 * Router context description.
 */
export interface IRouterContext {
  routingActions: {
    replace(path: string): void;
    push(path: string): void;
    goBack(): void;
  };
  routingState: {
    path: string;
  };
}

/**
 * Context manager related to routing management.
 * It is responsible for routing, navigation and history.
 */
export class RouterContextManager extends ContextManager<IRouterContext> {

  public readonly history: History = createBrowserHistory();

  public context: IRouterContext = {
    routingActions: {
      goBack: this.goBack,
      push: this.push,
      replace: this.replace
    },
    routingState: {
     path: this.history.location.pathname
    }
  };

  private readonly log: Logger = new Logger(RouterContextManager.name);

  private readonly setState = ContextManager.getSetter(this, "routingState");

  private unregister: Optional<Callable> = null;

  /**
   * Replace path in page history.
   */
  @Bind()
  public replace(path: Path): void {

    this.log.info(`Replace path: ${path}.`);
    this.history.replace(path);
  }

  /**
   * Push path in page history.
   */
  @Bind()
  public push(path: Path): void {

    this.log.info(`Push path: ${path}.`);
    this.history.push(path);
  }

  /**
   * Go back in page history.
   */
  @Bind()
  public goBack(): void {

    this.log.info("Go back.");
    this.history.goBack();
  }

  protected onProvisionStarted(): void {

    this.log.info("Started router context provision.");

    this.unregister = this.history.listen((location: Location) => this.setState({ path: location.pathname }));
  }

  protected onProvisionEnded(): void {

    this.log.info("Stopped router context provision.");

    if (this.unregister) {
      this.unregister();
    }
  }

}
