import { ReactElement, Suspense } from "react";
import { Route, Router as ReactRouter, Switch } from "react-router";

// Data.
import { RouterContextManager } from "@Main/data/store";

// View.
import { ErrorPage } from "@Main/view/pages/ErrorPage";
import { DefaultLoader } from "@Main/view/utils";

// Modules.
import { HomeModule } from "@Modules/home";

export function RootRouter(): ReactElement {

  return (
    <Suspense fallback={<DefaultLoader/>}>

      <ReactRouter history={RouterContextManager.HISTORY}>

        <Switch>

          <Route exact={true} path={[ "/", "/home" ]} component={HomeModule}/>

          <Route component={ErrorPage}/>

        </Switch>

      </ReactRouter>

    </Suspense>
  );
}
