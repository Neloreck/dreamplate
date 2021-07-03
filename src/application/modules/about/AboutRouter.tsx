import { ReactElement } from "react";
import { Route, Switch } from "react-router";

import { DefaultErrorFallback } from "@/core/view/layouts";
import { AboutPage } from "@/modules/about/view/AboutPage";

export function AboutRouter(): ReactElement {
  return (
    <Switch>

      <Route path={"/about"} component={AboutPage} exact={true}/>

      <Route component={DefaultErrorFallback}/>

    </Switch>
  );
}
