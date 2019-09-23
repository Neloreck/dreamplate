/**
 * @module @application/home
 */

import { HistoryFallback } from "@Main/view/layouts/HistoryFallback";
import { ReactElement } from "react";
import { hot } from "react-hot-loader/root";
import { Route, Switch } from "react-router";

// View.
import { ErrorPage } from "@Main/view/pages/ErrorPage";
import { HomePage } from "@Modules/home/view/pages/HomePage";

export function HomeRouter(): ReactElement {

  return (
    <Switch>

      <Route path={[ "/", "/home" ]} component={HomePage} exact={true}/>

      <Route path={[ "/error", "/home*" ]} component={ErrorPage} exact={true}/>

      <Route component={HistoryFallback}/>

    </Switch>
  );
}

export const HotHomeRouter: typeof HomeRouter = hot(HomeRouter);
