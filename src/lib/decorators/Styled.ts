import { ClassType, Component, ComponentState } from "react";
import { default as withStyles, InjectOptions, StyleCreator, Styles } from "react-jss";

export const Styled = <P extends string, ThemeType extends object, Properties = {}>(
  style: Styles<P, Properties> | StyleCreator<P, ThemeType, Properties>,
  options?: InjectOptions
): ClassDecorator => {

  return (target: ClassType<P, any, any>): ClassType<P, any, any> => {
    return withStyles(style, options)(target);
  };
};
