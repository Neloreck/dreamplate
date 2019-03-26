import { Provide } from "dreamstate";
import * as React from "react";
import { ComponentClass, PureComponent, ReactNode } from "react";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";

// Lib.
import { Wrapped } from "@Lib/decorators";

// Data
import { authContextManager, routerContextManager, themeContextManager } from "@Main/data/store";

// View.
import { GlobalThemeProvider } from "@Main/view/layouts/GlobalThemeProvider";
import { LazyLoadComponentFactory } from "@Main/view/utils/LazyLoadComponentFactory";

/*
 * Application submodules with own routes:
 */

export const HomeModule: ComponentClass = LazyLoadComponentFactory.getComponent(
  () => import(/* webpackChunkName: "module@home" */"@Module/home")
);

/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */

@Provide(authContextManager, routerContextManager, themeContextManager)
@Wrapped(GlobalThemeProvider)
export class Router extends PureComponent {

  public render(): ReactNode {

    return (
      <Switch>

        <Route exact={true} path={"*"} component={HomeModule}/>

      </Switch>
    );
  }

}
