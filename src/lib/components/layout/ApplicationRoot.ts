/**
 * @module @lib/components
 */

import { css, CSSResult, html, LitElement, TemplateResult } from "lit-element";

// Lib.
import { CustomElement, ICustomElementAttributes } from "@Lib/components";
import { Logger } from "@Lib/utils";

// Props.
export interface IApplicationRootProps extends ICustomElementAttributes<ApplicationRoot> {
}

/**
 * Example of web-components based element for fastest rendering.
 */
@CustomElement("application-root")
export class ApplicationRoot extends LitElement {

  public static get styles(): CSSResult {
    return css`
      :host {
        display: flex;
        align-items: center;
        flex-direction: column;
        max-height: 100vh;
        min-height: 100vh;
        overflow: auto;
      }
    `;
  }

  /* <dev> */

  public firstUpdated(): void {

    const logger: Logger = new Logger("ROOT");

    logger.pushSeparator();
    logger.info("🔶 Rendering begun.");
    logger.info("🔶 First render timestamp:", Date.now());
    logger.pushSeparator();
  }

  /* </dev> */

  public render(): TemplateResult {
    return html`<slot/>`;
  }

}
