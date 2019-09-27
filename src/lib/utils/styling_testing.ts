/**
 * @module @lib/utils
 */

import { mount, ShallowWrapper } from "enzyme";
import { createElement, ReactElement } from "react";
import { ThemeProvider } from "react-jss";

// Lib.
import { createDefaultTheme } from "@Lib/theme";

/**
 * Create mock classes object for testing.
 */
export const createMockClasses = (): { [index: string]: string } => new Proxy({}, { get: (target: {}, property: string): string => property });

/**
 * Utility for rendering react component inside JSS context.
 */
export const withMockedTheme = (element: ReactElement) => createElement(ThemeProvider, { children: element, theme: createDefaultTheme });

/**
 * Utility to get nested in @Styled element.
 */
export const getThemedComponent = (element: ShallowWrapper<any>) => mount(element.getElement()).children().children();
