import { ReactElement } from "react";
import { Route, Switch } from "react-router";

import { DefaultErrorFallback } from "@/core/view/layouts";
import { ErrorPage } from "@/modules/error/view/pages/ErrorPage";

export function ErrorRouter(): ReactElement {
  return (
    <Switch>
      <Route path={"/error"} component={ErrorPage} exact={true} />

      <Route render={() => <DefaultErrorFallback reload={false} />} />
    </Switch>
  );
}
