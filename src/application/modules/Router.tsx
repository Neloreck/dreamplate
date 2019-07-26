import { Provide } from "dreamstate";
import { PureComponent, ReactNode } from "react";
import { Route, Switch } from "react-router";

// Data
import { authContextManager, routerContextManager, themeContextManager } from "@Main/data/store";

// View.
import { HomeModule } from "@Module/home";

@Provide(themeContextManager, routerContextManager, authContextManager)
export class Router extends PureComponent {

  public render(): ReactNode {

    return (
      <Switch>

        <Route exact={true} path={"*"} component={HomeModule}/>

      </Switch>
    );
  }

}
