/**
 * @module @lib/components
 */

import { css, CSSResult, html, LitElement, TemplateResult, unsafeCSS } from "lit-element";

// Lib.
import { ICustomElementAttributes } from "@Lib/components";
import { CustomElement, Property } from "@Lib/decorators";
import { BLACK, DEFAULT_PRIMARY_DARK, DEFAULT_PRIMARY_LIGHT, DEFAULT_PRIMARY_MAIN } from "@Lib/theme";

// Props.
export type TCustomButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface ICustomButtonProps extends ICustomElementAttributes<CustomButton> {
  label: string;
  size?: TCustomButtonSize;
}

/**
 * Example of web-components based element for fastest rendering.
 */
@CustomElement("custom-button")
export class CustomButton extends LitElement {

  public static get styles(): CSSResult {
    return css`
      :host {
        align-self: center;
        border: 1px solid ${unsafeCSS(BLACK)};
        color: ${unsafeCSS(BLACK)};
        background: ${unsafeCSS(DEFAULT_PRIMARY_LIGHT)};
        box-shadow: 6px 1px 4px 0px rgba(0, 0, 0, 0.25), 6px 7px 5px 0px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        font-weight: bold;
        padding: 0.5rem;
        transition-duration: 250ms;
        user-select: none;
      }

      :host([size="xs"]) {
        font-size: 0.5rem;
      }

      :host([size="sm"]) {
        font-size: 0.75rem;
      }

      :host, :host([size="md"]) {
        font-size: 1rem;
      }

      :host([size="lg"]) {
        font-size: 1.25rem;
      }

      :host([size="xl"]) {
        font-size: 1.5rem;
      }

      :host(:hover) {
        background: ${unsafeCSS(DEFAULT_PRIMARY_MAIN)};
      }

      :host(:active) {
        background: ${unsafeCSS(DEFAULT_PRIMARY_DARK)};
      }
    `;
  }

  @Property()
  private label: string = "";

  @Property()
  private size: TCustomButtonSize = "md";

  public render(): TemplateResult {
    return html`${this.label}`;
  }

}
