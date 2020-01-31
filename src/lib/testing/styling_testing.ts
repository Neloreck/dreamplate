/**
 * @module @lib/testing
 */

import { mount, shallow, ShallowWrapper } from "enzyme";
import { createElement, ReactElement } from "react";
import { JssProvider, SheetsRegistry, ThemeProvider } from "react-jss";

// Lib.
import { createDefaultTheme } from "@Lib/theme";

/**
 * Create mock classes object for testing.
 */
export const createMockClasses = (): { [index: string]: string } => new Proxy({}, { get: (target: {}, property: string): string => property });

/**
 * Utility for rendering react component inside JSS context.
 */
export const withMockedTheme = (element: ReactElement) => createElement(ThemeProvider, { children: element, theme: createDefaultTheme(GTheme.DEFAULT_THEME_TYPE) });

/**
 * Utility to get nested in @Styled element.
 */
export const getThemedComponent = <T>(element: ShallowWrapper<T>) => mount(element.getElement()).children().children();

export const withMockedJss = (element: ReactElement, wrapper?: any) => {

  const sheets: SheetsRegistry = new SheetsRegistry();

  const Wrapper = (props: { children: ReactElement }) => {
    return createElement(JssProvider, { registry: sheets, children: createElement(ThemeProvider, { theme: createDefaultTheme(GTheme.DEFAULT_THEME_TYPE), children: wrapper ? createElement(wrapper, props) : props.children }, props.children), });
  };

  const tree = shallow(element, { wrappingComponent: Wrapper });

  return [ sheets.toString(), tree ];
};
