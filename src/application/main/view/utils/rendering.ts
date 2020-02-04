/**
 * @packageDocumentation
 * @module @application/main
 */

import { ComponentType, createElement } from "react";
import { render } from "react-dom";

// Application.
import { applicationConfig } from "@Main/data/configs";
import { HotRoot, Root } from "@Main/Root";

/**
 * Render application root node wrapped with global context.
 */
export const renderRoot = (children: ComponentType): void => {
  render(createElement(IS_DEV ? HotRoot : Root, {}, createElement(children)), applicationConfig.targetElements.applicationRoot);
};
