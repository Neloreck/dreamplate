import * as React from "react";
import { ComponentClass, PureComponent, ReactNode } from "react";
import { Route, Switch } from "react-router-dom";

// Lib.
import { Logger } from "@Lib/utils";

// View.
import { ErrorPage } from "@Main/view/pages/ErrorPage";
import { LazyLoadComponentFactory } from "@Main/view/utils/LazyLoadComponentFactory";

// Submodules.
const HomePage: ComponentClass = LazyLoadComponentFactory.getComponent(
  () => import(
    /* webpackChunkName: "home@home-page" */
    /* webpackPreload: true */
    "@Module/home/view/pages/HomePage"),
  <div> Loading... </div> /* Fallback for loading time. */
);

export class HomeRouter extends PureComponent {

  private readonly log: Logger = new Logger("[HOME]");

  public componentDidMount(): void {

    this.log.info("Mounted home module.");
    this.log.pushSeparator();
  }

  public render(): ReactNode {

    return (
      <Switch>

        <Route exact={true} path={["/", "/home"]} component={HomePage}/>
        <Route exact={true} path={"*"} component={ErrorPage}/>

      </Switch>
    );
  }

}
