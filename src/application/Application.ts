/**
 * @module main
 */

import { createElement, StrictMode } from "react";
import { hydrate, render } from "react-dom";

// Lib.
import { APPLICATION_ROOT } from "@Build/build_constants";
import { EntryPoint } from "@Lib/decorators";

// View.
import { HotRoot, Root } from "@Modules/Root";

/**
 * Application entrypoint.
 * Render based on environment mode and conditions.
 */
@EntryPoint()
export class Application {

  /**
   * Callable application entry point.
   */
  public static main(): void {

    if (IS_DEV) {
      this.renderDevmode();
    } else {
      this.render();
    } // Else if SSR.
  }

  /**
   * Common render in optimized mode.
   */
  public static render(): void {
    render(createElement(Root),document.getElementById(APPLICATION_ROOT));
  }

  /**
   * Hydrate DOM after SSR pre-render.
   */
  public static hydrate(): void {
    hydrate(createElement(Root), document.getElementById(APPLICATION_ROOT));
  }

  /**
   * Render with StrictMode for debug and hot root.
   */
  public static renderDevmode(): void {
    render(createElement(StrictMode, {}, createElement(HotRoot)), document.getElementById(APPLICATION_ROOT));
  }

}
