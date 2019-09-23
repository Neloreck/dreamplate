/**
 * @module @application/about
 */

import { ReactElement } from "react";
import { hot } from "react-hot-loader/root";
import { Route, Switch } from "react-router";

// View.
import { HistoryFallback } from "@Main/view/layouts/HistoryFallback";
import { ErrorPage } from "@Main/view/pages/ErrorPage";
import { AboutPage } from "@Modules/about/view/AboutPage";

export function AboutRouter(): ReactElement {

  return (
    <Switch>

      <Route path={"/about"} component={AboutPage} exact={true}/>

      <Route path={"/about*"} component={ErrorPage} exact={true}/>

      <Route component={HistoryFallback}/>

    </Switch>
  );
}

export const HotAboutRouter: typeof AboutRouter = hot(AboutRouter);
