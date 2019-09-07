import { Provide } from "dreamstate";
import { PureComponent, ReactNode } from "react";
import { Route, Switch } from "react-router";

// Data
import { authContextManager, routerContextManager, themeContextManager } from "@Main/data/store";

// View.
import { ErrorPage } from "@Main/view/pages/ErrorPage";
import { HomeModule } from "@Modules/home";

@Provide(themeContextManager, routerContextManager, authContextManager)
export class Router extends PureComponent {

  public render(): ReactNode {

    return (
      <Switch>

        <Route exact={true} path={"*"} component={HomeModule}/>

        <Route component={ErrorPage}/>

      </Switch>
    );
  }

}
