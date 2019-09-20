/**
 * @module @lib/components
 */

import { CSSResult } from "lit-element";

export const nestedShadowOf = (component: { styles: CSSResult }, ...nested: Array<string>) => {

  let commented: string = "";

  nested.forEach((it: string) => commented += `<!----><!---->${it}<!----><!---->`);

  return `${commented}<style>${component.styles}</style>`;
};
