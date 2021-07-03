import { ComponentType, createElement, ReactElement } from "react";
import { render } from "react-dom";

import { applicationConfig } from "@/core/data/configs";
import { Root } from "@/core/Root";

/**
 * Render application root node wrapped with global context based on current environment.
 */
export function renderRoot(
  children: ComponentType,
  target: HTMLElement = applicationConfig.TARGET_DOM_ELEMENTS.applicationRoot
): void {
  const content: ReactElement = createElement(children);

  render(
    createElement(Root, {}, content),
    target
  );
}
