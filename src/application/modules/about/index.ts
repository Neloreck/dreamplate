/**
 * @packageDocumentation
 * @module @application/about
 */

// View.
import { renderRoot } from "@Main/view/utils";
import { AboutRouter, HotAboutRouter } from "@Modules/about/AboutRouter";

renderRoot(AboutRouter, HotAboutRouter);
