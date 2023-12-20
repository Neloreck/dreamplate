import { ContextManager } from "dreamstate";
import { createBrowserHistory, History, Update } from "history";

import { log } from "#/macroses/log.macro";

/**
 * Router context description.
 */
export interface IRouterContext {
  routingActions: {
    setUrl<T extends string | URL>(url: T): T;
    replaceUrl<T extends string | URL>(url: T): T;
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
      setUrl: <T extends string | URL>(url: T) => this.setUrl(url),
      replaceUrl: <T extends string | URL>(url: T) => this.replaceUrl(url),
    },
    history: this.history,
    path: this.history.location.pathname,
  };

  private unsubscribeFromHistory!: () => void;

  public onProvisionStarted(): void {
    const { path } = this.context;

    log.info("Routing provision started @", path);

    this.unsubscribeFromHistory = this.history.listen((update: Update) =>
      this.setContext({ path: update.location.pathname }));
  }

  public onProvisionEnded(): void {
    log.info("Routing provision ended.");

    this.unsubscribeFromHistory();
  }

  /**
   * Set current page href.
   */
  public setUrl<T extends string | URL>(url: T): T {
    window.location.href = url as string;

    return url;
  }

  /**
   * Replace current page href.
   */
  public replaceUrl<T extends string | URL>(href: T): T {
    window.location.replace(href);

    return href;
  }
}
