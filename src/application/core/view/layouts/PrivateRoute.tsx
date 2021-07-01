import { useManager } from "dreamstate";
import { ReactElement, useEffect, useLayoutEffect } from "react";
import { Route, RouteProps } from "react-router";

import { AuthManager, IAuthContext, IRouterContext, RouterManager } from "@Core/data/store";

export interface IPrivateRouteProps extends RouteProps {
  authContext: IAuthContext;
  reversed?: boolean;
  redirect: string | boolean;
  routerContext: IRouterContext;
}

const DEFAULT_REDIRECT: string = "/authentication/login";

/**
 * Route subscribed to auth context manager.
 * Prevent rendering and enforce login if status is not valid.
 * Render route if everything is okay.
 */
export function PrivateRoute({
  reversed = false,
  redirect = true,
  authContext: { user } = useManager(AuthManager),
  routerContext: { routingActions: { replace }, path } = useManager(RouterManager),
  ...routeProps
}: IPrivateRouteProps): ReactElement {
  // First mount.
  useLayoutEffect(() => {
    if (!user.isLoading && (reversed ? user.value : !user.value)) {
      if (redirect === true) {
        replace(DEFAULT_REDIRECT + "?next=" + path);
      } else {
        replace((redirect as string).replace(/%currentPath%/, path));
      }
    }
  }, []);

  // Every update.
  useEffect(() => {
    if (!user.isLoading && (reversed ? user.value : !user.value)) {
      // todo: Own NEXT implementation for redirect.
      const next: string = "/"; // getQueryParams().next;

      replace(
        typeof next === "string"
          ? next as string
          : typeof redirect === "string" ? redirect as string : "/todo"
      );
    }
  });

  return <Route {...routeProps}/>;
}
