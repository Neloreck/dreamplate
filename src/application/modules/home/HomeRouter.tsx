import { Provide } from "dreamstate";
import * as React from "react";
import { ComponentClass, PureComponent, ReactNode } from "react";
import { Route, Switch } from "react-router-dom";

// Lib.
import { Wrapped } from "@Lib/decorators";

// Data.
import { authContextManager, routerContextManager, themeContextManager } from "@Main/data/store";
import { GlobalThemeProvider } from "@Main/view/layouts/GlobalThemeProvider";

// View.
import { ErrorPage } from "@Main/view/pages/ErrorPage";
import { lazyLoadComponentFactory } from "@Main/view/utils";

// Submodules.
const HomePage: ComponentClass = lazyLoadComponentFactory.getComponent(
  () => import(/* webpackChunkName: "home@home-page" */"@Module/home/view/pages/HomePage")
);

@Provide(themeContextManager, authContextManager, routerContextManager)
@Wrapped(GlobalThemeProvider)
export class HomeRouter extends PureComponent {

  public render(): ReactNode {

    return (
      <Switch>

        <Route exact={true} path={`/`} component={HomePage}/>
        <Route exact={true} path={"*"} component={ErrorPage}/>

      </Switch>
    );
  }

}
