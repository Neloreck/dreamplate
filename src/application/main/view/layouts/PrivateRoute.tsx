import { Consume } from "dreamstate";
import * as React from "react";
import { Route, RouteProps } from "react-router";

// Data.
import { authContextManager, IAuthContext, IRouterContext, routerContextManager } from "@Main/data/store";

// View.

// Props.
export interface IPrivateRouteOwnProps {
  reversed?: boolean;
  redirect: string | boolean;
}

export interface IPrivateRouteInjectedProps extends IAuthContext, IRouterContext {}
export interface IPrivateRouteProps extends IPrivateRouteOwnProps, IPrivateRouteInjectedProps, RouteProps {}

@Consume(authContextManager, routerContextManager)
export class PrivateRoute extends Route<IPrivateRouteProps> {

  private DEFAULT_REDIRECT: string = "/authentication/login";

  public componentWillMount(): void {

    const { redirect, reversed, routingActions: { replace }, routingState: { history }, authState: { authorized, authorizing } } = this.props;

    if (authorizing === false && (reversed ? authorized : !authorized)) {
      if (redirect === true) {
        replace(this.DEFAULT_REDIRECT + "?next=" + history.location.pathname);
      } else {
        replace((redirect as string).replace(/%currentPath%/, history.location.pathname));
      }
    }
  }

  public componentWillReceiveProps(nextProps: IPrivateRouteProps): void {

    const { redirect, reversed, authState: { authorizing, authorized }, routingActions: { replace } } = nextProps;

    if (authorizing === false && (reversed ? authorized : !authorized)) {

      // todo: Own NEXT implementation for redirect.
      const next = "/"; // getQueryParams().next;

      replace(typeof next === "string" ? next as string : (typeof redirect === "string" ? redirect as string : "/todo"));
    }
  }

}
