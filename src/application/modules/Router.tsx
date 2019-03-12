import { Provide } from "dreamstate";
import * as React from "react";
import { ComponentClass, PureComponent, ReactNode } from "react";
import { Route, Router as ReactRouter } from "react-router";
import { Switch } from "react-router-dom";

// Lib;
import { Wrapped } from "@Lib/decorators";

// Data
import { authContextManager, routerContextManager, themeContextManager } from "@Main/data/store";

// View.
import { GlobalThemeProvider } from "@Main/view/layouts/GlobalThemeProvider";
import { lazyLoadComponentFactory } from "@Main/view/utils";

/*
 * Application submodules:
 */

export const HomeModule: ComponentClass = lazyLoadComponentFactory.getComponent(
  () => import(/* webpackChunkName: "module@home" */"@Module/home")
);

/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */

@Provide(authContextManager, routerContextManager, themeContextManager)
@Wrapped(GlobalThemeProvider)
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
