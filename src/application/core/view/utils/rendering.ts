import { ComponentType, createElement } from "react";
import { render } from "react-dom";

import { applicationConfig } from "@Core/data/configs";
import { HotRoot, Root } from "@Core/Root";

const RENDER_TARGET: HTMLElement = applicationConfig.targetElements.applicationRoot;

/**
 * Render application root node wrapped with global context based on current environment.
 */
export const renderRoot = (children: ComponentType, hotChildren: ComponentType) =>
  IS_DEV
    ? render(createElement(HotRoot, {}, createElement(hotChildren)), RENDER_TARGET)
    : render(createElement(Root, {}, createElement(children)), RENDER_TARGET);
