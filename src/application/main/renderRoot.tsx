/**
 * @module @application/main
 */

import { createElement, ReactElement } from "react";
import { render } from "react-dom";

// Application.
import { applicationConfig } from "@Main/data/configs";
import { HotRoot, Root } from "@Main/Root";

/**
 * Render application root node wrapped with global context.
 */
export const renderRoot = (children: ReactElement): void => {
  render(createElement(IS_DEV ? HotRoot : Root, {}, children), applicationConfig.targetElements.applicationRoot);
};
