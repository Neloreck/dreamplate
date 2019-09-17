/**
 * @module @application/main
 */

import { Provide } from "dreamstate";
import { PureComponent, ReactNode } from "react";
import { hot } from "react-hot-loader/root";

// Data
import { AuthContextManager, RouterContextManager, ThemeContextManager } from "@Main/data/store";

// Application.
import { RootProvider } from "@Application/RootProvider";
import { RootRouter } from "@Application/RootRouter";

/**
 * Application root.
 * Render global router and provider with data shared for all modules.
 */
@Provide(ThemeContextManager, RouterContextManager, AuthContextManager)
export class Root extends PureComponent {

  public render(): ReactNode {

    return (
      <RootProvider>

        <RootRouter/>

      </RootProvider>
    );
  }

}

/**
 * Decorated Root as hot-exported react element.
 */
export const HotRoot: typeof Root = hot(Root);
