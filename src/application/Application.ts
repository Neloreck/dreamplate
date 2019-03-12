import { createElement } from "react";
import { render } from "react-dom";

// Lib.
import { EntryPoint } from "@Lib/decorators";

// Assets.
import "@Main/view/assets/style/global.scss";
import "typeface-roboto";

// View.
import { Router } from "@Application/modules/Router";

@EntryPoint()
export class Application {

  public static main(): void {
    render(createElement(Router), document.getElementById("application-root"));
  }

}
