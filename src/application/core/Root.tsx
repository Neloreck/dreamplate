import { ScopeProvider, createProvider } from "dreamstate";
import { ReactElement, ReactNode } from "react";

import { AuthManager, RouterManager, ThemeManager } from "@/core/data/store";
import { RootProvider } from "@/core/RootProvider";

/**
 * Application root.
 * Render global router and provider with data shared for all modules.
 */

const GlobalProvider = createProvider([ ThemeManager, RouterManager, AuthManager ]);

export function Root({ children = null as ReactNode }): ReactElement {
  return (
    <ScopeProvider>
      <GlobalProvider>
        <RootProvider>{children}</RootProvider>
      </GlobalProvider>
    </ScopeProvider>
  );
}
