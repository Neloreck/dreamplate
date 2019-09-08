import { createElement, StrictMode } from "react";
import { hydrate, render } from "react-dom";

// Lib.
import { APPLICATION_ROOT } from "@Build/build_constants";
import { EntryPoint } from "@Lib/decorators";
import { applicationConfig } from "@Main/data/configs/ApplicationConfig";

// View.
import { Root } from "@Modules/Root";

@EntryPoint()
export class Application {

  public static main(): void {

    if (applicationConfig.isDev) {
      this.renderDevmode();
    } else {
      this.render();
    }
  }

  /**
   * Common render.
   */
  public static render(): void {

    render(
      createElement(Root),
      document.getElementById(APPLICATION_ROOT)
    );
  }

  /**
   * Render with StrictMode for debug.
   */
  public static renderDevmode(): void {

    render(
      createElement(StrictMode, {}, createElement(Root)),
      document.getElementById(APPLICATION_ROOT)
    );
  }

  /**
   * Hydrate DOM after SSR pre-render.
   */
  public static hydrate(): void {

    hydrate(
      createElement(Root),
      document.getElementById(APPLICATION_ROOT)
    );
  }

}
