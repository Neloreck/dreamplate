import { useManager } from "dreamstate";
import { ReactElement } from "react";
import { JssProvider, ThemeProvider } from "react-jss";
import { Router as ReactRouter } from "react-router";

// Data.
import { routerContextManager, ThemeContextManager, themeContextManager } from "@Main/data/store";

export function ApplicationProvider(props: any): ReactElement {

  const { themeState: { theme } } = useManager(themeContextManager);

  return (
    <ReactRouter history={routerContextManager.history}>

      <JssProvider id={ThemeContextManager.JSS_CONFIG}>

        <ThemeProvider theme={theme}>

          { props.children }

        </ThemeProvider>

      </JssProvider>

    </ReactRouter>
  );
}
