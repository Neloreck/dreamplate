import { ScopeProvider, createProvider } from "dreamstate";
import { createElement, FunctionComponent, ReactElement, ReactNode } from "react";
import { hot } from "react-hot-loader/root";

import { TAnyObject } from "@Lib/ts";

import { AuthManager, RouterManager, ThemeManager } from "@Core/data/store";
import { RootProvider } from "@Core/RootProvider";

/**
 * Application root.
 * Render global router and provider with data shared for all modules.
 */

const GlobalProvider: FunctionComponent = createProvider([
  ThemeManager,
  RouterManager,
  AuthManager
]);

export function Root({ children = null as ReactNode }): ReactElement {
  return (
    <ScopeProvider>
      <GlobalProvider>
        <RootProvider>
          { children }
        </RootProvider>
      </GlobalProvider>
    </ScopeProvider>
  );
}

/**
 * Decorated Root as hot-exported react element.
 */
export const HotRoot: typeof Root = hot((props: TAnyObject) => createElement(Root, props));
