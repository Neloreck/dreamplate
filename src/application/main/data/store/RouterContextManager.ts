/**
 * @packageDocumentation
 * @module @application/main
 */

import { Bind, ContextManager, TStateSetter } from "dreamstate";
import { createBrowserHistory, History, Location, Path } from "history";

// Lib.
import { log } from "@Macro/log.macro";

/**
 * Router context description.
 */
export interface IRouterContext {
  routingActions: {
    replace(path: Path): void;
    hardPush(path: Path): void;
    hardReplace(path: Path): void;
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
      goBack: this.goBack.bind(this),
      hardPush: this.hardPush.bind(this),
      hardReplace: this.hardReplace.bind(this),
      push: this.push.bind(this),
      replace: this.replace.bind(this)
    },
    routingState: {
     path: RouterContextManager.HISTORY.location.pathname
    }
  };

  private unsubscribeFromHistory!: () => void;

  private readonly setState: TStateSetter<IRouterContext, "routingState"> = ContextManager.getSetter(this, "routingState");

  /**
   * Replace path in page history.
   */
  public replace(path: Path): void {

    log.info(`Replace path: ${path}.`);

    RouterContextManager.HISTORY.replace(path);
  }

  /**
   * Push path in page history.
   */
  public push(path: Path): void {

    log.info(`Push path: ${path}.`);

    RouterContextManager.HISTORY.push(path);
  }

  /**
   * Hard push path in page history with page reload.
   */
  public hardPush(path: Path): void {

    log.info(`Hard push path: ${path}.`);

    window.location.pathname = path;
  }

  /**
   * Hard replace path in page history with page reload.
   */
  public hardReplace(path: Path): void {

    log.info(`Hard replace path: ${path}.`);

    window.location.replace(path);
  }

  /**
   * Go back in page history.
   */
  public goBack(): void {

    log.info("Go back.");

    RouterContextManager.HISTORY.goBack();
  }

  protected onProvisionStarted(): void {

    const { routingState: { path } } = this.context;

    log.info(`Routing provision started [${path}].`);

    this.unsubscribeFromHistory = RouterContextManager.HISTORY.listen((location: Location) => this.setState({ path: location.pathname }));
  }

  protected onProvisionEnded(): void {

    const { routingState: { path } } = this.context;

    log.info(`Routing provision ended [${path}].`);

    this.unsubscribeFromHistory();
  }

}
