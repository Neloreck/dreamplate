import { mount, ShallowWrapper } from "enzyme";
import { createElement, ReactElement } from "react";
import { ThemeProvider } from "react-jss";

// Lib.
import { createDefaultTheme } from "./utils";

/**
 * Utility for rendering react component inside JSS context.
 */
export const withMockedTheme = (element: ReactElement) => createElement(ThemeProvider, { children: element, theme: createDefaultTheme });

/**
 * Utility to get nested in @Styled element.
 */
export const getThemedComponent = (element: ShallowWrapper<any>) => mount(element.getElement()).children().children();
