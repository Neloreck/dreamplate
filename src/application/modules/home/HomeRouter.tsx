/**
 * @module @application/home
 */

import { ReactElement } from "react";
import { Route, Switch } from "react-router";

// View.
import { ErrorPage } from "@Main/view/pages/ErrorPage";
import { HomePage } from "@Modules/home/view/pages/HomePage";

export function HomeRouter(): ReactElement {

  return (
    <Switch>

      <Route exact={true} path={[ "/", "/home" ]} component={HomePage}/>

      <Route component={ErrorPage}/>

      </Switch>
    );
  }
