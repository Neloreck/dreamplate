/**
 * @module @application/about
 */

import { ReactElement } from "react";
import { hot } from "react-hot-loader/root";
import { Route, Switch } from "react-router";

// View.
import { ErrorPage } from "@Modules/error/view/pages/ErrorPage";

export function ErrorRouter(): ReactElement {

  return (
    <Switch>

      <Route component={ErrorPage} exact={true}/>

    </Switch>
  );
}

export const HotErrorRouter: typeof ErrorRouter = hot(ErrorRouter);
