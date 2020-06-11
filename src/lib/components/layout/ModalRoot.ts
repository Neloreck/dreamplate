import { css, CSSResult, html, LitElement, TemplateResult } from "lit-element";

import { CustomElement, ICustomElementAttributes } from "@Lib/components";

export interface IModalRootProps extends ICustomElementAttributes<ModalRoot> {
}

/**
 * Example of web-components based element for fastest rendering.
 */
@CustomElement("modal-root")
export class ModalRoot extends LitElement {

  public static get styles(): CSSResult {
    return css`
      :host {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        background-color: #000A;
      }

      :host([hidden]) {
        display: none;
      }
    `;
  }

  public render(): TemplateResult {
    return html`<slot/>`;
  }

}
