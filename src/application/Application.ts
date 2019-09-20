/**
 * @module @application/main
 */

import { applicationConfig } from "@Main/data/configs";
import { createElement } from "react";
import { render } from "react-dom";

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
   * Check current environment state and call needed method.
   */
  public static main(): void {

    if (IS_DEV) {
      /* <dev> */
      this.renderHot();
      /* </dev> */
    } else {
      this.render();
    }
  }

  /**
   * Common render in optimized mode.
   */
  public static render(): void {
    render(createElement(Root), applicationConfig.targetElements.applicationRoot);
  }

  /* <dev> */

  /**
   * Render with StrictMode for debug and hot root.
   * Reminder: StrictMode forces some components to render twice.
   */
  public static renderHot(): void {
    render(createElement(HotRoot), applicationConfig.targetElements.applicationRoot);
  }

  /* </dev> */

}
