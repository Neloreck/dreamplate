/**
 * @module @application/home
 */

import { ReactElement } from "react";
import { hot } from "react-hot-loader/root";
import { Route, Switch } from "react-router";

// View.
import { HomePage } from "@Modules/home/view/pages/HomePage";

export function HomeRouter(): ReactElement {

  return (
    <Switch>

      <Route path={[ "/", "/home" ]} component={HomePage} exact={true}/>

    </Switch>
  );
}

export const HotHomeRouter: typeof HomeRouter = hot(HomeRouter);
