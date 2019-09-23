/**
 * @module main/view
 */

import { ReactElement } from "react";

// Lib.
import { Optional } from "@Lib/ts";

export function HistoryFallback(): Optional<ReactElement> {

  window.location.reload();

  return null;
}
