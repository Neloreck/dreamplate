import { withStyles } from "@material-ui/core";
import { StyleRules, StyleRulesCallback, WithStylesOptions } from "@material-ui/core/styles/withStyles";
import { ClassType, Component, ComponentState } from "react";

export function Styled<P1, T1 extends Component<P1, ComponentState>, ClassKey extends string, Options extends WithStylesOptions<ClassKey> = {}>(
  style: StyleRulesCallback<ClassKey> | StyleRules<ClassKey>, options?: Options): (target: ClassType<P1, T1, any>) => ClassType<P1, T1, any> {

  return (target: ClassType<P1, T1, any>): ClassType<P1, T1, any> => {
    return withStyles(style, options)(target);
  };
}
