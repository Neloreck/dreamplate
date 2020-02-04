/**
 * @packageDocumentation
 * @module @application/error
 */

import { ErrorRouter, HotErrorRouter } from "@Modules/error/ErrorRouter";

// View.
import { renderRoot } from "@Main/view/utils";

renderRoot(IS_DEV ? HotErrorRouter : ErrorRouter);
