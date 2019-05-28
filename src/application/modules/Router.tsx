import { Provide } from "dreamstate";
import { PureComponent, ReactNode } from "react";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";

// Lib.
import { Wrapped } from "@Lib/decorators";

// Data
import { authContextManager, routerContextManager, themeContextManager } from "@Main/data/store";

// View.
import { GlobalProvider } from "@Main/view/layouts";
import { HomeModule } from "@Module/home";

@Provide(themeContextManager, routerContextManager, authContextManager)
@Wrapped(GlobalProvider)
export class Router extends PureComponent {

  public render(): ReactNode {

    return (
      <Switch>

        <Route exact={true} path={"*"} component={HomeModule}/>

      </Switch>
    );
  }

}
