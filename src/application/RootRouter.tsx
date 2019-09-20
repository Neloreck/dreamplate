import { ReactElement, Suspense } from "react";
import { Route, Router as ReactRouter, Switch } from "react-router";

// Data.
import { RouterContextManager } from "@Main/data/store";

// Modules.
import { HomeModule } from "@Modules/home";

// View.
import { ErrorPage } from "@Main/view/pages/ErrorPage";

import "@Lib/components/custom/CustomLoader";

export function RootRouter(): ReactElement {

  return (
    <Suspense fallback={<custom-loader width={100} height={100}/>}>

      <ReactRouter history={RouterContextManager.HISTORY}>

        <Switch>

          <Route path={[ "/", "/home" ]} component={HomeModule} exact={true}/>

          <Route component={ErrorPage}/>

        </Switch>

      </ReactRouter>

    </Suspense>
  );
}
