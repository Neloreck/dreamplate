import { useManager } from "dreamstate";
import { ReactElement, ReactNode, Suspense } from "react";
import { JssProvider, ThemeProvider } from "react-jss";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";

import { RouterManager, ThemeManager } from "@/core/data/store";

/**
 * Root provider for application.
 */
export function RootProvider({
  children = null as ReactNode,
  themeContext: { theme } = useManager(ThemeManager),
  routerContext: { history } = useManager(RouterManager)
}): ReactElement {
  return (
    <HistoryRouter history={history}>
      <JssProvider id={ThemeManager.JSS_ID_GENERATION_CONFIG}>
        <ThemeProvider theme={theme}>
          <Suspense fallback={<div> Loading </div>}>{children}</Suspense>
        </ThemeProvider>
      </JssProvider>
    </HistoryRouter>
  );
}
