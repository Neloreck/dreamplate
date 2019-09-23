/**
 * @module @application/main
 */

import { useManager } from "dreamstate";
import { ReactElement, ReactNode, Suspense } from "react";
import { JssProvider, ThemeProvider } from "react-jss";

// Data.
import { ThemeContextManager } from "@Main/data/store";

/**
 * Root provider for application.
 */
export function RootProvider(props: { children: ReactNode }): ReactElement {

  const { themeState: { theme } } = useManager(ThemeContextManager);

  return (
    <JssProvider id={ThemeContextManager.JSS_ID_GENERATION_CONFIG}>

      <ThemeProvider theme={theme}>

        <Suspense fallback={<custom-loader width={100} height={100}/>}>

          { props.children }

        </Suspense>

      </ThemeProvider>

    </JssProvider>
  );
}
