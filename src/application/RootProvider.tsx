/**
 * @module @application/main
 */

import { useManager } from "dreamstate";
import { ReactElement, ReactNode } from "react";
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

        { props.children }

      </ThemeProvider>

    </JssProvider>
  );
}
