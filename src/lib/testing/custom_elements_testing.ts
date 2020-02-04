/**
 * @packageDocumentation
 * @module @lib/testing
 */

import { CSSResult } from "lit-element";

/**
 * Get component shadow content based on parameters and its style.
 */
const nestedShadowOf = (component: { styles: CSSResult }, enclosing: { before: string; after: string }, ...nested: Array<string>) => {

  const style: string = `<style>${component.styles}</style>`;

  if (nested.length === 0) {
    return style;
  } else {

    let commented: string = "<!---->";

    nested.forEach((it: string) => commented += `${enclosing.before}${it}${enclosing.after}`);

    commented += "<!---->";

    return `${commented}${style}`;
  }
};

/**
 * Expect component shadow to contain value.
 */
export const nestedShadowValueOf = (component: { styles: CSSResult }, ...nested: Array<string>) =>
  nestedShadowOf(component, { after: "<!---->", before: "<!---->" }, ...nested);

/**
 * Expect component shadow to contain slot.
 */
export const nestedShadowSlotOf = (component: { styles: CSSResult }, ...nested: Array<string>) =>
  nestedShadowOf(component, { after: "</slot>", before: "<slot>" }, ...nested);
