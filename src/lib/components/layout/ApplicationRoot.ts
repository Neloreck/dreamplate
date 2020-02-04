/**
 * @module @lib/components
 */

import { css, CSSResult, html, LitElement, TemplateResult } from "lit-element";

// Lib.
import { log } from "@Macro/log.macro"
import { CustomElement, ICustomElementAttributes } from "@Lib/components";

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

  public firstUpdated(): void {

    log.pushSeparator();
    log.info("🔶 Rendering begun.");
    log.info("🔶 First render timestamp:", Date.now());
    log.pushSeparator();
  }

  public render(): TemplateResult {
    return html`<slot/>`;
  }

}
