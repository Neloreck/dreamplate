/**
 * @module @application/about
 */

import { ReactElement } from "react";
import { hot } from "react-hot-loader/root";
import { Redirect, Route, Switch } from "react-router";

// View.
import { ErrorPage } from "@Modules/error/view/pages/ErrorPage";

export function ErrorRouter(): ReactElement {

  return (
    <Switch>

      <Route path={"/error"} component={ErrorPage} exact={true}/>

      <Route render={() => <Redirect to={"/error"}/>}/>

    </Switch>
  );
}

export const HotErrorRouter: typeof ErrorRouter = hot(ErrorRouter);
