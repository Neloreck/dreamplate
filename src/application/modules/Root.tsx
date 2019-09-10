import { Provide } from "dreamstate";
import { PureComponent, ReactNode } from "react";
import { hot } from "react-hot-loader/root";
import { Route, Switch } from "react-router";

// Data
import { authContextManager, routerContextManager, themeContextManager } from "@Main/data/store";

// View.
import { ErrorPage } from "@Main/view/pages/ErrorPage";
import { HomeModule } from "@Modules/home";
import { RootProvider } from "@Modules/RootProvider";

@Provide(routerContextManager, themeContextManager, authContextManager)
export class Root extends PureComponent {

  public render(): ReactNode {

    return (
      <RootProvider>

        <Switch>

          <Route exact={true} path={"*"} component={HomeModule}/>

          <Route component={ErrorPage}/>

        </Switch>

      </RootProvider>
    );
  }

}

export const HotRoot: typeof Root = hot(Root);
