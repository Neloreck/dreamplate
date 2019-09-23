/**
 * @module @application/main
 */

import { Provide } from "dreamstate";
import { PureComponent, ReactNode } from "react";
import { hot } from "react-hot-loader/root";
import { Router as ReactRouter } from "react-router";

// Data
import { AuthContextManager, RouterContextManager, ThemeContextManager } from "@Main/data/store";

// Application.
import { RootProvider } from "@Main/RootProvider";

// View.
import "@Lib/components/custom/CustomLoader";
import "@Lib/components/layout/ApplicationRoot";
import "@Lib/components/layout/ModalRoot";

/**
 * Application root.
 * Render global router and provider with data shared for all modules.
 */
@Provide(ThemeContextManager, RouterContextManager, AuthContextManager)
export class Root extends PureComponent {

  public render(): ReactNode {

    const { children } = this.props;

    return (
      <RootProvider>

        <ReactRouter history={RouterContextManager.HISTORY}>

          { children }

        </ReactRouter>

      </RootProvider>
    );
  }

}

/**
 * Decorated Root as hot-exported react element.
 */
export const HotRoot: typeof Root = hot(Root);
