/**
 * @packageDocumentation
 * @module @application/about
 */

// View.
import { renderRoot } from "@Main/view/utils";
import { AboutRouter, HotAboutRouter } from "@Modules/about/AboutRouter";

renderRoot(IS_DEV ? HotAboutRouter : AboutRouter);
