import { mount, shallow, ShallowWrapper } from "enzyme";
import { createElement, ReactElement } from "react";
import { JssProvider, SheetsRegistry, ThemeProvider } from "react-jss";

// Lib.
import { createDefaultTheme } from "@Lib/theme";

/**
 * Create mock classes object for testing.
 */
export function createMockClasses(): { [index: string]: string } {
  return new Proxy({}, { get: (target: {}, property: string): string => property });
}

/**
 * Utility for rendering react component inside JSS context.
 */
export function withMockedTheme (element: ReactElement) {
  return createElement(ThemeProvider, { children: element, theme: createDefaultTheme(GTheme.DEFAULT_THEME_TYPE) });
}
/**
 * Utility to get nested in @Styled element.
 */
export function getThemedComponent <T>(element: ShallowWrapper<T>) {
  return mount(element.getElement()).children().children();
}

/**
 * Utility for class component with @styled testing.
 */
export function withMockedJss (element: ReactElement, wrapper?: any) {
  const sheets: SheetsRegistry = new SheetsRegistry();

  const Wrapper = (props: { children: ReactElement }) => {
    // Nested provider of theme and consumer of jss.
    const themeProvider = createElement(
      ThemeProvider,
      {
        theme: createDefaultTheme(GTheme.DEFAULT_THEME_TYPE),
        children: wrapper ? createElement(wrapper, props) : props.children
      },
      props.children
    );

    return createElement(JssProvider, { registry: sheets, children: themeProvider });
  };

  const tree = shallow(element, { wrappingComponent: Wrapper });

  return [ sheets.toString(), tree ];
}
