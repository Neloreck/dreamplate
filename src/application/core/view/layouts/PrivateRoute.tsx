import { useManager } from "dreamstate";
import { ReactElement, useEffect, useLayoutEffect } from "react";
import { Route, RouteProps } from "react-router-dom";

import { AuthManager, IAuthContext, IRouterContext, RouterManager } from "@/core/data/store";

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
  routerContext: { history, path } = useManager(RouterManager),
  ...routeProps
}: IPrivateRouteProps): ReactElement {
  useLayoutEffect(() => {
    if (!user.isLoading && (reversed ? user.value : !user.value)) {
      if (redirect === true) {
        history.replace(DEFAULT_REDIRECT + "?next=" + path);
      } else {
        history.replace((redirect as string).replace(/%currentPath%/, path));
      }
    }
  }, []);

  useEffect(() => {
    if (!user.isLoading && (reversed ? user.value : !user.value)) {
      // todo: Own NEXT implementation for redirect.
      const next: string = "/"; // getQueryParams().next;

      history.replace(
        typeof next === "string" ? (next as string) : typeof redirect === "string" ? (redirect as string) : "/todo"
      );
    }
  });

  return <Route {...routeProps} />;
}
