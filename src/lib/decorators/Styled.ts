import { Styles, StyleSheetFactoryOptions } from "jss";
import { ClassType } from "react";
import { default as withStyles } from "react-jss";

type ThemedStyles<Theme> = (theme: Theme) => Styles<string>;

export const Styled = <S extends Styles<string> | ThemedStyles<any>, P>(
  styles: S,
  options?: StyleSheetFactoryOptions
): ClassDecorator => {

  return (target: ClassType<P, any, any>): ClassType<P, any, any> => {
    return withStyles(styles, options)(target);
  };
};
