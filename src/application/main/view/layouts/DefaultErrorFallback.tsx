/**
 * @module main/view
 */

import { ReactElement, useEffect } from "react";

// Lib.
import { Optional } from "@Lib/ts";
import { Redirect } from "react-router";

export function DefaultErrorFallback(): ReactElement {

  useEffect(() => window.location.reload(), []);

  return <Redirect to={"/error"}/>;
}
