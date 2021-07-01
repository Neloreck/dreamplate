import { ReactElement } from "react";
import { Route, Switch } from "react-router";

import { DefaultErrorFallback } from "@Core/view/layouts";

import { HomePage } from "@Modules/home/view/pages/HomePage";

export function HomeRouter(): ReactElement {
  return (
    <Switch>

      <Route path={[ "/", "/home" ]} component={HomePage} exact={true}/>

      <Route component={DefaultErrorFallback}/>

    </Switch>
  );
}
