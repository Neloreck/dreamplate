/**
 * @module @application/about
 */

import { ReactElement } from "react";
import { hot } from "react-hot-loader/root";
import { Route, Switch } from "react-router";

// View.
import { DefaultErrorFallback } from "@Main/view/layouts";
import { AboutPage } from "@Modules/about/view/AboutPage";

export function AboutRouter(): ReactElement {

  return (
    <Switch>

      <Route path={"/about"} component={AboutPage} exact={true}/>

      <Route component={DefaultErrorFallback}/>

    </Switch>
  );
}

export const HotAboutRouter: typeof AboutRouter = hot(AboutRouter);
