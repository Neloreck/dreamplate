import { ComponentType, createElement, ReactElement } from "react";
import { render } from "react-dom";

import { applicationConfig } from "@Core/data/configs";
import { Root } from "@Core/Root";

const RENDER_TARGET: HTMLElement = applicationConfig.TARGET_DOM_ELEMENTS.applicationRoot;

/**
 * Render application root node wrapped with global context based on current environment.
 */
export function renderRoot(children: ComponentType, wrapper?: ComponentType): void {
  const content: ReactElement = createElement(children);

  render(
    createElement(Root, {}, wrapper ? createElement(wrapper, {}, content) : content),
    RENDER_TARGET
  );
}
