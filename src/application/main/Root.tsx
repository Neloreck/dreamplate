/**
 * @packageDocumentation
 * @module @application/main
 */

import {Provide, createLoadable, createProvider} from "dreamstate";
import {createElement, PureComponent, ReactNode} from "react";
import { hot } from "react-hot-loader/root";
import { Router as ReactRouter } from "react-router";

// Data.
import { AuthContextManager, RouterContextManager, ThemeContextManager } from "@Main/data/store";

// Application.
import { RootProvider } from "@Main/RootProvider";

// View.
import "@Lib/components/custom/CustomLoader";
import "@Lib/components/layout/ApplicationRoot";
import "@Lib/components/layout/ModalRoot";

const PPPP = createProvider(ThemeContextManager, RouterContextManager, AuthContextManager);

const PR = (...sources: any) => (classDescriptor: any) => ({
  ...classDescriptor,
  finisher: (Component: any) => {
    return (props: object) => createElement(PPPP, {}, createElement(Component, props))
  }
});

/**
 * Application root.
 * Render global router and provider with data shared for all modules.
 */
@PR(ThemeContextManager, RouterContextManager, AuthContextManager)
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
