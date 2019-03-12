import { Provide } from "dreamstate";
import * as React from "react";
import { ComponentClass, PureComponent, ReactNode } from "react";
import { Route, Switch } from "react-router-dom";

// Lib.
import { Wrapped } from "@Lib/decorators";
import { Logger } from "@Lib/utils";

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

  private readonly log: Logger = new Logger("[HOME]");

  public componentDidMount(): void {
    this.log.info("Mounted home module.");
  }

  public render(): ReactNode {

    return (
      <Switch>

        <Route exact={true} path={`/`} component={HomePage}/>
        <Route exact={true} path={"*"} component={ErrorPage}/>

      </Switch>
    );
  }

}
