/**
 * @module lib/decorators
 */

import { ComponentClass, createElement, ReactElement } from "react";

/**
 * Inject another component above decorated via decorator.
 */
export const Wrapped =
  <ComponentProps, WrapProps>(WrapComponent: ComponentClass<WrapProps>, wrapProps?: WrapProps): ClassDecorator =>
    <T>(Target: T): any => {

      function WrappedComponent(props: ComponentProps): ReactElement {
        return createElement(WrapComponent, wrapProps, createElement(Target as any, props));
      }

      // todo: Hoist non-react statics, if you want to prevent statics erasing.

      return WrappedComponent;
  };
