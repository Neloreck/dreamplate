import { createElement } from "react";
import { render } from "react-dom";

// Lib.
import { APPLICATION_ROOT } from "@Build/BuildConstants";
import { EntryPoint } from "@Lib/decorators";

// View.
import { Router } from "@Application/modules/Router";

@EntryPoint()
export class Application {

  public static main(): void {
    render(createElement(Router), document.getElementById(APPLICATION_ROOT));
  }

}
