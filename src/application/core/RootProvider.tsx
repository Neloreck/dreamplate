/**
 * @packageDocumentation
 * @module @application/main
 */

import { useManager } from "dreamstate";
import { ReactElement, ReactNode, Suspense } from "react";
import { JssProvider, ThemeProvider } from "react-jss";

// Data.
import { ThemeContextManager } from "@Core/data/store";

/**
 * Root provider for application.
 */
export function RootProvider({
  children = null as ReactNode,
  themeContext: { themeState } = useManager(ThemeContextManager)
}): ReactElement {

  return (
    <JssProvider id={ThemeContextManager.JSS_ID_GENERATION_CONFIG}>

      <ThemeProvider theme={themeState.theme}>

        <Suspense fallback={<custom-loader width={100} height={100}/>}>

          { children }

        </Suspense>

      </ThemeProvider>

    </JssProvider>
  );
}
