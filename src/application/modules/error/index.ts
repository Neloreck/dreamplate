/**
 * @packageDocumentation
 * @module @application/error
 */

// View.
import { renderRoot } from "@Main/view/utils";
import { ErrorRouter, HotErrorRouter } from "@Modules/error/ErrorRouter";

renderRoot(ErrorRouter, HotErrorRouter);
