import { useManager } from "dreamstate";
import { ReactElement, useEffect, useLayoutEffect } from "react";
import { Route, RouteProps } from "react-router";

// Data.
import { authContextManager, routerContextManager } from "@Main/data/store";

// View.

// Props.
export interface IPrivateRouteProps extends RouteProps {
  reversed?: boolean;
  redirect: string | boolean;
}

const DEFAULT_REDIRECT: string = "/authentication/login";

export function PrivateRoute({ reversed, redirect = true, ...routeProps }: IPrivateRouteProps): ReactElement {

  const { routingActions: { replace }, routingState: { path } } = useManager(routerContextManager);
  const { authState: { authorized, authorizing } } = useManager(authContextManager);

  // First mount.
  useLayoutEffect(() => {

    if (!authorizing && (reversed ? authorized : !authorized)) {

      if (redirect === true) {
        replace(DEFAULT_REDIRECT + "?next=" + path);
      } else {
        replace((redirect as string).replace(/%currentPath%/, path));
      }
    }
  }, []);

  // Every update.
  useEffect(() => {

    if (!authorizing && (reversed ? authorized : !authorized)) {

      // todo: Own NEXT implementation for redirect.
      const next = "/"; // getQueryParams().next;

      replace(typeof next === "string" ? next as string : (typeof redirect === "string" ? redirect as string : "/todo"));
    }
  });

  return <Route {...routeProps}/>;
}
