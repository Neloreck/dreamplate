import { Styles, StyleSheetFactoryOptions } from "jss";
import { ClassType } from "react";
import { default as withStyles } from "react-jss";

export const Styled = <P extends string, ThemeType extends object, Properties = {}>(
  style: Styles<P>,
  options?: StyleSheetFactoryOptions
): ClassDecorator => {

  return (target: ClassType<P, any, any>): ClassType<P, any, any> => {
    return withStyles(style, options as any)(target);
  };
};
