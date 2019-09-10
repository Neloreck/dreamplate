import { Provide } from "dreamstate";
import { PureComponent, ReactNode } from "react";
import { hot } from "react-hot-loader/root";
import { Route, Switch } from "react-router";

// Data
import { authContextManager, routerContextManager, themeContextManager } from "@Main/data/store";

// View.
import { ErrorPage } from "@Main/view/pages/ErrorPage";
import { ApplicationProvider } from "@Modules/ApplicationProvider";
import { HomeModule } from "@Modules/home";

@Provide(routerContextManager, themeContextManager, authContextManager)
export class Root extends PureComponent {

  public render(): ReactNode {

    return (
      <ApplicationProvider>

        <Switch>

          <Route exact={true} path={"*"} component={HomeModule}/>

          <Route component={ErrorPage}/>

        </Switch>

      </ApplicationProvider>
    );
  }

}

export default hot(Root);
