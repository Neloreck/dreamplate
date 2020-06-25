import { css, CSSResult, html, LitElement, TemplateResult, unsafeCSS } from "lit-element";

import { CustomElement, ICustomElementAttributes } from "@Lib/components";

export type TCustomButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export type TCustomButtonColor = "primary" | "secondary" | "grayscale";

export interface ICustomButtonProps extends ICustomElementAttributes<CustomButton> {
  size?: TCustomButtonSize;
  color?: TCustomButtonColor;
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
        border: 1px solid ${unsafeCSS(GColor.BLACK)};
        color: ${unsafeCSS(GColor.BLACK)};
        box-shadow: 6px 1px 4px 0px rgba(0, 0, 0, 0.25), 6px 7px 5px 0px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        font-weight: bold;
        padding: 0.5rem;
        transition-duration: 250ms;
        user-select: none;
      }

      :host, :host([color="primary"]) {
        background: ${unsafeCSS(GTheme.DEFAULT_PRIMARY_LIGHT)};
      }

      :host(:hover), :host([color="primary"]:hover) {
         background: ${unsafeCSS(GTheme.DEFAULT_PRIMARY_MAIN)};
      }

      :host(:active), :host([color="primary"]:active) {
         background: ${unsafeCSS(GTheme.DEFAULT_PRIMARY_DARK)};
      }

      :host([color="secondary"]) {
        background: ${unsafeCSS(GTheme.DEFAULT_SECONDARY_LIGHT)};
      }

      :host([color="secondary"]:hover) {
         background: ${unsafeCSS(GTheme.DEFAULT_SECONDARY_MAIN)};
      }

      :host([color="secondary"]:active) {
         background: ${unsafeCSS(GTheme.DEFAULT_SECONDARY_DARK)};
      }

      :host([color="grayscale"]) {
        background: ${unsafeCSS(GColor.GRAY_400)};
      }

      :host([color="grayscale"]:hover) {
         background: ${unsafeCSS(GColor.GRAY_600)};
      }

      :host([color="grayscale"]:active) {
         background: ${unsafeCSS(GColor.GRAY_700)};
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
    `;
  }

  public render(): TemplateResult {
    return html`<slot/>`;
  }

}
