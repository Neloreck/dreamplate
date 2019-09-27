/**
 * @module @lib/components
 */

import { css, CSSResult, html, LitElement, TemplateResult } from "lit-element";

// Lib.
import { CustomElement, ICustomElementAttributes } from "@Lib/components";

// Props.
export interface ICustomCardProps extends ICustomElementAttributes<CustomCard> {
}

/**
 * Example of web-components based element for fastest rendering.
 */
@CustomElement("custom-card")
export class CustomCard extends LitElement {

  public static get styles(): CSSResult {
    return css`
      :host {
        box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.25), 0px 4px 5px 0px rgba(0, 0, 0, 0.15), 0px 1px 10px 0px rgba(0, 0, 0, 0.10);
        margin: 1rem;
        padding: 1rem;
      }
    `;
  }

  public render(): TemplateResult {
    return html`<slot/>`;
  }

}
