/**
 * @module @lib/components
 */

import { css, CSSResult, LitElement, unsafeCSS } from "lit-element";

// Lib.
import { CustomElement, ICustomElementAttributes, Property } from "@Lib/components";
import { DEFAULT_PRIMARY_DARK, DEFAULT_PRIMARY_MAIN } from "@Lib/theme";

// Props.
export interface ICustomLoader extends ICustomElementAttributes<CustomLoader> {
  width?: number;
  height?: number;
  borderWidth?: number;
}

/**
 * Example of web-components based element for fastest rendering.
 */
@CustomElement("custom-loader")
export class CustomLoader extends LitElement {

  public static readonly LOADER_DISPLAY_DELAY: number = 1000;

  public static get styles(): CSSResult {
    return css`
      :host([loading="true"]) {
        border-radius: 50%;
        border-style: solid;
        border-color: ${unsafeCSS(DEFAULT_PRIMARY_MAIN)} transparent ${unsafeCSS(DEFAULT_PRIMARY_DARK)} transparent;
        animation: sl-rotation 2s linear infinite;
      }

     @keyframes sl-rotation {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    `;
  }

  [index: string]: any;

  @Property({ type: Number })
  public width: number = 50;

  @Property({ type: Number })
  public height: number = 50;

  @Property({ type: Number })
  public borderWidth: number = 10;

  protected updated(changedProperties: Map<string, any>): void {
    changedProperties.forEach((oldValue: number, key: string) => this.style[key as any] = this[key] + "px");
  }

  protected firstUpdated(): void {
    window.setTimeout(() => this.setAttribute("loading", "true"), CustomLoader.LOADER_DISPLAY_DELAY);
  }

}
