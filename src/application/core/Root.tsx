import { createProvider, ScopeProvider } from "dreamstate";
import { ReactElement, ReactNode } from "react";

import { AuthManager, RouterManager, ThemeManager } from "@/core/data/store";
import { RootProvider } from "@/core/RootProvider";

const GlobalProvider = createProvider([ThemeManager, RouterManager, AuthManager]);

/**
 * Application root.
 * Render global router and provider with data shared for all modules.
 */
export function Root({ children = null as ReactNode }): ReactElement {
  return (
    <ScopeProvider>
      <GlobalProvider>
        <RootProvider>{children}</RootProvider>
      </GlobalProvider>
    </ScopeProvider>
  );
}
