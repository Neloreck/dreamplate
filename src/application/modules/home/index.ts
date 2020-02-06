/**
 * @packageDocumentation
 * @module @application/home
 */

// View.
import { renderRoot } from "@Main/view/utils";
import { HomeRouter, HotHomeRouter } from "@Modules/home/HomeRouter";

renderRoot(HomeRouter, HotHomeRouter);
