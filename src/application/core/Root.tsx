import { createProvider } from "dreamstate";
import { FunctionComponent, ReactElement, ReactNode } from "react";
import { hot } from "react-hot-loader/root";

import { AuthContextManager, RouterContextManager, ThemeContextManager } from "@Core/data/store";
import { RootProvider } from "@Core/RootProvider";

import "@Lib/components/custom/CustomLoader";
import "@Lib/components/layout/ApplicationRoot";
import "@Lib/components/layout/ModalRoot";

/**
 * Application root.
 * Render global router and provider with data shared for all modules.
 */

const GlobalProvider: FunctionComponent = createProvider([
  ThemeContextManager,
  RouterContextManager,
  AuthContextManager
]);

export function Root({ children = null as ReactNode }): ReactElement {
  return (
    <GlobalProvider>
      <RootProvider>
        { children }
      </RootProvider>
    </GlobalProvider>
  );
}

/**
 * Decorated Root as hot-exported react element.
 */
export const HotRoot: typeof Root = hot(Root);
