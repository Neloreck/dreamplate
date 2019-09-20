/**
 * @module @lib/components
 */

import { css, CSSResult, LitElement, unsafeCSS } from "lit-element";

// Lib.
import { ICustomElementAttributes } from "@Lib/components";
import { CustomElement, Property } from "@Lib/decorators";
import { DEFAULT_PRIMARY_DARK, DEFAULT_PRIMARY_MAIN } from "@Lib/theme";

// Props.
export interface ISpinnerLoaderProps extends ICustomElementAttributes<SpinnerLoader> {
  width?: number;
  height?: number;
  radius?: number;
}

/**
 * Example of web-components based element for fastest rendering.
 */
@CustomElement("spinner-loader")
export class SpinnerLoader extends LitElement {

  public static readonly LOADER_DISPLAY_DELAY: number = 1000;

  public static get styles(): CSSResult {
    return css`
      :host([loading="true"]) {
        border-radius: 50%;
        border-style: solid;
        border-color: ${ unsafeCSS(DEFAULT_PRIMARY_MAIN) } transparent ${ unsafeCSS(DEFAULT_PRIMARY_DARK) } transparent;
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

  @Property({ type: Number })
  public width: number = 50;

  @Property({ type: Number })
  public height: number = 50;

  @Property({ type: Number })
  public radius: number = 10;

  protected updated(changedProperties: Map<PropertyKey, any>): void {

    this.style.width = this.width + "px";
    this.style.height = this.height + "px";
    this.style.borderWidth = this.radius + "px";
  }

  protected firstUpdated(): void {
    window.setTimeout(() => this.setAttribute("loading", "true"), SpinnerLoader.LOADER_DISPLAY_DELAY);
  }

}
