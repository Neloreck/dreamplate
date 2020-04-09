import { ReactElement, useLayoutEffect } from "react";

// Lib.
import { Redirect } from "react-router";

export function DefaultErrorFallback({ reload = true }): ReactElement {
  useLayoutEffect(() => reload ? window.location.reload() : void (0), []);

  return <Redirect to={`/error?from=${window.location.pathname}`}/>;
}
