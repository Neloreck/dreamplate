import { ReactElement } from "react";
import { Route, Switch } from "react-router";

import { DefaultErrorFallback } from "@Core/view/layouts";

import { ErrorPage } from "@Modules/error/view/pages/ErrorPage";

export function ErrorRouter(): ReactElement {
  return (
    <Switch>

      <Route path={"/error"} component={ErrorPage} exact={true}/>

      <Route render={() => <DefaultErrorFallback reload={false}/>}/>

    </Switch>
  );
}
