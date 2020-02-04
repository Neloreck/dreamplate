/**
 * @packageDocumentation
 * @module @application/main
 */

import { useManager } from "dreamstate";
import { ReactElement, useEffect, useLayoutEffect } from "react";
import { Route, RouteProps } from "react-router";

// Data.
import { AuthContextManager, RouterContextManager } from "@Main/data/store";

// Props.
export interface IPrivateRouteProps extends RouteProps {
  reversed?: boolean;
  redirect: string | boolean;
}

const DEFAULT_REDIRECT: string = "/authentication/login";

/**
 * Route subscribed to auth context manager.
 * Prevent rendering and enforce login if status is not valid.
 * Render route if everything is okay.
 */
export function PrivateRoute({ reversed, redirect = true, ...routeProps }: IPrivateRouteProps): ReactElement {

  const { routingActions: { replace }, routingState: { path } } = useManager(RouterContextManager);
  const { authState: { isAuthorizing, isAuthorized } } = useManager(AuthContextManager);

  // First mount.
  useLayoutEffect(() => {

    if (!isAuthorizing && (reversed ? isAuthorized : !isAuthorized)) {

      if (redirect === true) {
        replace(DEFAULT_REDIRECT + "?next=" + path);
      } else {
        replace((redirect as string).replace(/%currentPath%/, path));
      }
    }
  }, []);

  // Every update.
  useEffect(() => {

    if (!isAuthorizing && (reversed ? isAuthorized : !isAuthorized)) {

      // todo: Own NEXT implementation for redirect.
      const next: string = "/"; // getQueryParams().next;

      replace(typeof next === "string" ? next as string : (typeof redirect === "string" ? redirect as string : "/todo"));
    }
  });

  return <Route {...routeProps}/>;
}
