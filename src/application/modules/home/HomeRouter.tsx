/**
 * @module home
 */

import { PureComponent, ReactNode } from "react";
import { Route, Switch } from "react-router";

// Lib.
import { Logger } from "@Lib/utils";

// View.
import { ErrorPage } from "@Main/view/pages/ErrorPage";
import { HomePage } from "@Modules/home/view/pages/HomePage";

export class HomeRouter extends PureComponent {

  private readonly log: Logger = new Logger(HomeRouter.name);

  public componentDidMount(): void {

    this.log.pushSeparator();
    this.log.info("Mounted home module.");
    this.log.pushSeparator();
  }

  public render(): ReactNode {

    return (
      <Switch>

        <Route exact={true} path={["/", "/home"]} component={HomePage}/>

        <Route component={ErrorPage}/>

      </Switch>
    );
  }

}
