/**
 * @packageDocumentation
 * @module @application/main
 */

import { ReactElement, useEffect } from "react";

// Lib.
import { Redirect } from "react-router";

export function DefaultErrorFallback(): ReactElement {

  useEffect(() => window.location.reload(), []);

  return <Redirect to={"/error"}/>;
}
