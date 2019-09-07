import { createElement } from "react";
import { render } from "react-dom";

// Lib.
import { APPLICATION_ROOT } from "@Build/build_constants";
import { EntryPoint } from "@Lib/decorators";

// View.
import { Router } from "@Modules/Router";

@EntryPoint()
export class Application {

  public static main(): void {
    render(createElement(Router), document.getElementById(APPLICATION_ROOT));
  }

}
