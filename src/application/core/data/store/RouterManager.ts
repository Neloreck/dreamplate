import { ContextManager } from "dreamstate";
import { createBrowserHistory, History, Location, Path } from "history";

import { log } from "#/macroses/log.macro";

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
  history: History;
  path: string;
}

/**
 * Context manager related to routing management.
 * It is responsible for routing, navigation and history.
 */
export class RouterManager extends ContextManager<IRouterContext> {

  public readonly history: History = createBrowserHistory();

  public readonly context: IRouterContext = {
    routingActions: {
      goBack: this.goBack.bind(this),
      hardPush: this.hardPush.bind(this),
      hardReplace: this.hardReplace.bind(this),
      push: this.push.bind(this),
      replace: this.replace.bind(this)
    },
    history: this.history,
    path: this.history.location.pathname
  };

  private unsubscribeFromHistory!: () => void;

  public onProvisionStarted(): void {
    const { path } = this.context;

    log.info("Routing provision started @", path);

    this.unsubscribeFromHistory = this.history.listen((location: Location) =>
      this.setContext({ path: location.pathname }));
  }

  public onProvisionEnded(): void {
    log.info("Routing provision ended.");

    this.unsubscribeFromHistory();
  }

  /**
   * Replace path in page history.
   */
  public replace(path: Path): void {
    log.info("Replace path:", path);

    this.history.replace(path);
  }

  /**
   * Push path in page history.
   */
  public push(path: Path): void {
    log.info("Push path:", path);

    this.history.push(path);
  }

  /**
   * Hard push path in page history with page reload.
   */
  public hardPush(path: Path): void {
    log.info("Hard push path:", path);

    window.location.href = path;
  }

  /**
   * Hard replace path in page history with page reload.
   */
  public hardReplace(path: Path): void {
    log.info("Hard replace path:", path);

    window.location.replace(path);
  }

  /**
   * Go back in page history.
   */
  public goBack(): void {
    log.info("Go back.");

    this.history.goBack();
  }

}
