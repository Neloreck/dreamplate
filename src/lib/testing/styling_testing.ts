import { mount, ReactWrapper, ShallowWrapper } from "enzyme";
import { Classes } from "jss";
import { createElement, ReactElement } from "react";
import { ThemeProvider } from "react-jss";

import { createDefaultTheme } from "@Lib/theme";
import { TAnyObject } from "@Lib/types";

/**
 * Create mock classes object for testing.
 */
export function createMockClasses(): Classes {
  return new Proxy({}, { get: (target: TAnyObject, property: string): string => property });
}

/**
 * Utility for rendering react component inside JSS context.
 */
export function withMockedTheme(element: ReactElement): ReactElement {
  return createElement(ThemeProvider, { children: element, theme: createDefaultTheme(GTheme.DEFAULT_THEME_TYPE) });
}
/**
 * Utility to get nested in @Styled element.
 */
export function getThemedComponent <T>(element: ShallowWrapper<T>): ReactWrapper {
  return mount(element.getElement()).children()
    .children();
}
