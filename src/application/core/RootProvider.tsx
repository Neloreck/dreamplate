import { useManager } from "dreamstate";
import { ReactElement, ReactNode, Suspense } from "react";
import { JssProvider, ThemeProvider } from "react-jss";
import { Router as ReactRouter } from "react-router";

import { RouterContextManager, ThemeContextManager } from "@Core/data/store";

/**
 * Root provider for application.
 */
export function RootProvider({
  children = null as ReactNode,
  themeContext: { theme } = useManager(ThemeContextManager),
  routerContext: { history } = useManager(RouterContextManager)
}): ReactElement {
  return (
    <ReactRouter history={history}>

      <JssProvider id={ThemeContextManager.JSS_ID_GENERATION_CONFIG}>

        <ThemeProvider theme={theme}>

          <Suspense fallback={<custom-loader width={100} height={100}/>}>

            { children }

          </Suspense>

        </ThemeProvider>

      </JssProvider>

    </ReactRouter>
  );
}
