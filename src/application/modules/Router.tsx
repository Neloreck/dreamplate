import * as React from "react";
import { ComponentClass, PureComponent, ReactNode } from "react";
import { Route, Router as ReactRouter } from "react-router-dom";
import { Switch } from "react-router-dom";

// Data
import { routerContextManager } from "@Main/data/store";

// View.
import { lazyLoadComponentFactory } from "@Main/view/utils";

/*
 * Application submodules with own routes:
 */

export const HomeModule: ComponentClass = lazyLoadComponentFactory.getComponent(
  () => import(/* webpackChunkName: "module@home" */"@Module/home")
);

/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */

export class Router extends PureComponent {

  public render(): ReactNode {

    const { routingState: { history } } = routerContextManager.context;

    return (
      <ReactRouter history={history}>

        <Switch>

          <Route exact={true} path={"*"} component={HomeModule}/>

        </Switch>

      </ReactRouter>
    );
  }

}
