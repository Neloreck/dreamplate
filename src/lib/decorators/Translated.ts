import { ClassType, Component, ComponentState } from "react";
import { withTranslation } from "react-i18next";

export function Translated<P1, T1 extends Component<P1, ComponentState>>(namespace?: string | Array<string>): ClassDecorator {
  return (target: ClassType<P1, T1, any>): ClassType<P1, T1, any> => {
    return withTranslation(namespace)(target);
  };
}
