/**
 * @module @application/main
 */

import { Bind, ContextManager } from "dreamstate";
import { createBrowserHistory, History, Location, Path } from "history";

// Lib.
import { Logger } from "@Lib/utils";

/**
 * Router context description.
 */
export interface IRouterContext {
  routingActions: {
    replace(path: Path): void;
    hardPush(path: Path): void;
    push(path: Path): void;
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

  public static readonly HISTORY: History = createBrowserHistory();

  public context: IRouterContext = {
    routingActions: {
      goBack: this.goBack,
      hardPush: this.hardPush,
      push: this.push,
      replace: this.replace
    },
    routingState: {
     path: RouterContextManager.HISTORY.location.pathname
    }
  };

  private unsubscribeFromHistory!: () => void;

  private readonly log: Logger = new Logger(RouterContextManager.name);

  private readonly setState = ContextManager.getSetter(this, "routingState");

  /**
   * Replace path in page history.
   */
  @Bind()
  public replace(path: Path): void {

    this.log.info(`Replace path: ${path}.`);

    RouterContextManager.HISTORY.replace(path);
  }

  /**
   * Push path in page history.
   */
  @Bind()
  public push(path: Path): void {

    this.log.info(`Push path: ${path}.`);

    RouterContextManager.HISTORY.push(path);
  }

  /**
   * Hard push path in page history with reload.
   */
  @Bind()
  public hardPush(path: Path): void {

    this.log.info(`Hard push path: ${path}.`);

    RouterContextManager.HISTORY.push(path);
    window.location.reload();
  }

  /**
   * Go back in page history.
   */
  @Bind()
  public goBack(): void {

    this.log.info("Go back.");

    RouterContextManager.HISTORY.goBack();
  }

  protected onProvisionStarted(): void {

    const { routingState: { path } } = this.context;

    this.log.info(`Routing provision started [${path}].`);

    this.unsubscribeFromHistory = RouterContextManager.HISTORY.listen((location: Location) => this.setState({ path: location.pathname }));
  }

  protected onProvisionEnded(): void {

    const { routingState: { path } } = this.context;

    this.log.info(`Routing provision ended [${path}].`);

    this.unsubscribeFromHistory();
  }

}
