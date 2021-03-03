import { ComponentType, createElement } from "react";
import { render } from "react-dom";

import { applicationConfig } from "@Core/data/configs";
import { HotRoot } from "@Core/Root";

const RENDER_TARGET: HTMLElement = applicationConfig.targetElements.applicationRoot;

/**
 * Render application root node wrapped with global context based on current environment.
 */
export function renderRoot(children: ComponentType, wrapper?: ComponentType): void {
  const content = createElement(HotRoot, {}, createElement(children));

  render(
    wrapper ? createElement(wrapper, {}, content) : content,
    RENDER_TARGET
  );
}
