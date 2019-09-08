import { ComponentClass, createElement } from "react";

// tslint:disable typedef
export const Wrapped =
  <ComponentProps, WrapProps>(WrapComponent: ComponentClass<WrapProps>, wrapProps?: WrapProps) =>
    (Target: ComponentClass<any>): any => {

      function WrappedComponent(props: ComponentProps) {
        return createElement(WrapComponent, wrapProps, createElement(Target, props));
      }

      return WrappedComponent;
  };
