import { Bind, ContextManager } from "dreamstate";
import { createBrowserHistory, History, Location, Path } from "history";

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

  public readonly history: History = createBrowserHistory();

  public context: IRouterContext = {
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

  private readonly log: Logger = new Logger(this.constructor.name, true);

  private readonly setState = ContextManager.getSetter(this, "routingState");

  public constructor() {

    super();

    this.history.listen((location: Location) => this.setState({ path: location.pathname }));
  }

  @Bind()
  public replace(path: Path): void {

    this.log.info(`Replace path: ${path}.`);
    this.history.replace(path);
  }

  @Bind()
  public push(path: Path): void {

    this.log.info(`Push path: ${path}.`);
    this.history.push(path);
  }

  @Bind()
  public goBack(): void {

    this.log.info("Go back.");
    this.history.goBack();
  }

  @Bind()
  public getCurrentLocation(): string {
    return this.history.location.pathname;
  }

  protected onProvisionStarted(): void {
    this.log.info("Started router context provision.");
  }

}
