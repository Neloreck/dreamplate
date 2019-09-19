/**
 * @module @lib/components
 */

import { css, CSSResult, html, LitElement, TemplateResult } from "lit-element";

// Lib.
import { ICustomElementAttributes } from "@Lib/components";
import { CustomElement } from "@Lib/decorators";

// Props.
export interface IContentCardProps extends ICustomElementAttributes<ContentCard> {
}

/**
 * Example of web-components based element for fastest rendering.
 */
@CustomElement("content-card")
export class ContentCard extends LitElement {

  public static get styles(): CSSResult {
    return css`
      :host {
        box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.25), 0px 4px 5px 0px rgba(0, 0, 0, 0.15), 0px 1px 10px 0px rgba(0, 0, 0, 0.10);
        margin: 1rem;
        transition-duration: 500ms;
        padding: 1rem;
      }
    `;
  }

  public render(): TemplateResult {
    return html`<slot/>`;
  }

}
