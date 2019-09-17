/**
 * @module @application/main
 */

import { applicationConfig } from "@Main/data/configs";
import { createElement } from "react";
import { hydrate, render } from "react-dom";

// Lib.
import { EntryPoint } from "@Lib/decorators";

// View.
import { HotRoot, Root } from "@Application/Root";

import "@Lib/components/layout/ApplicationRoot";
import "@Lib/components/layout/ModalRoot";

/**
 * Application entry point.
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
    render(createElement(Root), applicationConfig.targetElements.applicationRoot);
  }

  /**
   * Hydrate DOM after SSR pre-render.
   */
  public static hydrate(): void {
    hydrate(createElement(Root), applicationConfig.targetElements.applicationRoot);
  }

  /**
   * Render with StrictMode for debug and hot root.
   * Reminder: StrictMode forces some components to render twice.
   */
  public static renderDevmode(): void {
    render(createElement(HotRoot), applicationConfig.targetElements.applicationRoot);
  }

}
