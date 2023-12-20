import { ComponentType, createElement, ReactElement, ReactNode, StrictMode } from "react";
import { createRoot } from "react-dom/client";

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
  const node: ReactNode = createElement(StrictMode, {}, createElement(Root, {}, content));

  createRoot(target!).render(node as any);
}
